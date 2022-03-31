import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";
import {
  VictoryChart,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import { MY_RESTAURANT_QUERY } from "../../graphql/query-mutation";

export const MyRestaurant = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const { data } = useQuery<myRestaurantQuery, myRestaurantQueryVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        myRestaurantInput: {
          id: +restaurantId,
        },
      },
    }
  );
  console.log(data);
  const chartData = [
    { x: 1, y: 3000 },
    { x: 2, y: 1500 },
    { x: 3, y: 4250 },
    { x: 4, y: 2460 },
    { x: 5, y: 7490 },
    { x: 6, y: 5800 },
    { x: 7, y: 6530 },
  ];

  return (
    <div className="">
      <div
        className=" bg-gray-700 py-28 bg-center bg-cover rounded-lg mt-5"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className=" mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant?.restaurant?.name || "Loading ..."}
        </h2>
        <Link
          to={`/restaurant/${restaurantId}/add-dish`}
          className=" text-white bg-gray-800 py-3 px-10 mr-8 rounded-lg"
        >
          Add a dish &rarr;
        </Link>
        <Link
          to={``}
          className=" text-white bg-orange-700 py-3 px-10 rounded-lg"
        >
          Buy Promotion &rarr;
        </Link>
      </div>
      <div className=" mt-5">
        {data?.myRestaurant.restaurant?.menu.length === 0 ? (
          <h4 className=" text-2xl mb-5 font-bold text-teal-700 rounded-lg px-5 py-3 flex-wrap text-center">
            Get started by adding a new dish to your restaurant.
          </h4>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 mt-10">
            {data?.myRestaurant.restaurant?.menu.map(
              ({ id, name, price, description, photo }) => (
                <Dish
                  key={id}
                  dishId={id}
                  name={name}
                  description={description}
                  price={price}
                  photo={photo}
                />
              )
            )}
          </div>
        )}
      </div>
      <div className=" mt-20 mb-20">
        <h4 className=" text-center text-2xl font-medium">Sales</h4>
        <div className="mt-10 shadow-md bg-gray-100 rounded-lg items-center justify-center">
          <VictoryChart containerComponent={<VictoryVoronoiContainer />}>
            <VictoryLine
              labels={({ datum }) => `$${datum.y}`}
              labelComponent={
                <VictoryLabel
                  style={{ fontSize: 10 }}
                  renderInPortal
                  dy={-20}
                />
              }
              height={500}
              width={window.innerWidth}
              domainPadding={50}
              theme={VictoryTheme.material}
              data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                x: order.createdAt,
                y: order.total,
              }))}
              interpolation="natural"
              style={{
                data: {
                  stroke: "orange",
                  strokeWidth: "5",
                },
              }}
            />

            <VictoryAxis
              style={{ tickLabels: { fontSize: 10 } }}
              tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
