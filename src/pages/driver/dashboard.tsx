import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MdDeliveryDining } from "react-icons/md";
import { Breadcrumb } from "../../components/breadcrumb";

const center = [34.17441356858446, 108.88897188083278];
const Dashboard = () => {
  return (
    <div className="min-h-full">
      <Breadcrumb step1="Home" step2="Dashboard" />
      <div className="overflow-hidden ">
        <MapContainer
          center={[34.17441356858446, 108.88897188083278]}
          zoom={10}
          style={{ width: window.innerWidth, height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[34.17441356858446, 108.88897188083278]}>
            <Popup>
              <MdDeliveryDining style={{ width: "10vh", height: "5vh" }} />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
