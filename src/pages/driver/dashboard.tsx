import React, { useEffect, useState, useRef } from "react";
import * as L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
// Import the JS and CSS:
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import marker from "../../images/delivery.gif";
import location from "../../images/location.png";
import { useMutation, useSubscription } from "@apollo/client";
import {
  COOKED_ORDERS_SUBSCRIPTION,
  TAKE_ORDER_MUTATION,
} from "../../graphql/query-mutation";
import { cookedOrdersSubscription } from "../../generated/cookedOrdersSubscription";
import { MdNoFood } from "react-icons/md";
import {
  takeOrderMutation,
  takeOrderMutationVariables,
} from "../../generated/takeOrderMutation";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

interface ICoords {
  lat: number;
  lng: number;
}

// Base map tile:
const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};
const Dashboard = () => {
  const newicon = L.icon({
    iconUrl: marker,
    iconSize: [120, 120],
  });
  // Set up a useState hook for our map instance:
  const [map, setMap] = useState<any>(null);

  // Set up the coords of the driver
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lat: 0,
    lng: 0,
  });

  // State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState<any>(null);

  // Start-End points for the routing machine:
  // const [start, setStart] = useState([34.17441356858446, 108.88897188083278]);
  const [end, setEnd] = useState([34.17441356858446, 109.88897188083278]);

  // Ref for our routing machine instance:
  const RoutingMachineRef = useRef(null);

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (position: GeolocationPositionError) => {};

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map) {
      map.panTo([driverCoords.lat, driverCoords.lng]);
    }
  }, [driverCoords.lat, driverCoords.lng]);

  const makeRoute = () => {
    // Check For the map instance:
    if (!map) return;
    if (map) {
      map.panTo([driverCoords.lat, driverCoords.lng]);

      // Assign Control to React Ref:
      // @ts-ignore
      RoutingMachineRef.current = L.Routing.control({
        position: "topright", // Where to position control on map
        lineOptions: {
          // Options for the routing line
          styles: [
            {
              color: "#008080",
            },
          ],
        },
        waypoints: [L.latLng(driverCoords.lat, driverCoords.lng), end], // Point A - Point B
        createMarker: function (i: number, waypoint: any, n: number) {
          if (i === 1) {
            const markers = L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: location,
                iconSize: [38, 45],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              }),
            });
            return markers;
          }
        },
      });
      console.log(L.latLng(driverCoords.lat, driverCoords.lng));
      // Save instance to state:
      setRoutingMachine(RoutingMachineRef.current);
    }
  };

  // Create the routing-machine instance:
  useEffect(() => {}, [map]);
  // Once routing machine instance is ready, add to map:
  useEffect(() => {
    if (!routingMachine) return;
    if (routingMachine) {
      routingMachine.addTo(map);
    }
  }, [routingMachine]);

  const { data: cookedOrdersData } = useSubscription<cookedOrdersSubscription>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      setTimeout(() => {
        makeRoute();
      }, 5000);
    }
  }, [cookedOrdersData]);
  const navigate = useNavigate();
  const onCompleted = (data: takeOrderMutation) => {
    if (data.takeOrder.ok) {
      navigate(`/orders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };

  const [takeOrderMutation] = useMutation<
    takeOrderMutation,
    takeOrderMutationVariables
  >(TAKE_ORDER_MUTATION, {
    onCompleted,
  });

  const triggerTakeOrderMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        takeOrderInput: {
          id: orderId,
        },
      },
    });
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <h5 className="flex items-center justify-center text-2xl font-sans font-bold text-gray-600 text-center mt-20">
          <FaMapMarkedAlt className="mr-2" /> Driver's Map
        </h5>
        <div className="md:my-24 my-20">
          <div>
            <MapContainer
              center={[37.0902, -95.7129]}
              zoom={5}
              zoomControl={false}
              style={{ height: "50vh", width: "100%", padding: 0 }}
              // Set the map instance to state when ready:
              whenCreated={(map) => setMap(map)}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Map">
                  <TileLayer url={maps.base} />
                </LayersControl.BaseLayer>
                {driverCoords ? (
                  <Marker icon={newicon} position={driverCoords}>
                    <Popup>You are here</Popup>
                  </Marker>
                ) : null}
              </LayersControl>
            </MapContainer>
          </div>

          <div className=" max-w-screen-sm mx-auto bg-white shadow-lg py-8 px-5 mt-10  rounded-lg">
            {cookedOrdersData?.cookedOrders ? (
              <>
                <div className="mt-2 p-4 mb-2 text-sm font-semibold text-gray-600 bg-orange-200 rounded-lg">
                  New Cooked order @
                  {cookedOrdersData.cookedOrders.restaurant?.name}, Pick it up
                  soon!
                </div>
                <div className="mx-auto">
                  <button
                    onClick={() =>
                      triggerTakeOrderMutation(
                        cookedOrdersData?.cookedOrders.id
                      )
                    }
                    className=" bg-teal-600 py-3 px-3 block rounded-lg text-white shadow-md font-semibold text-center mt-5"
                  >
                    Pick up Order
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center mt-2 items-center p-4 mb-2 text-xl font-sans font-semibold text-center text-teal-600 bg-teal-50 rounded-lg">
                <MdNoFood className="mr-2" /> No Orders Yet...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
