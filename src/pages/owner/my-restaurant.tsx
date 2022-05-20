import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../generated/myRestaurantQuery";
import {
  VictoryChart,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import { MY_RESTAURANT_QUERY } from "../../graphql/query-mutation";
import { BsBarChartLineFill } from "react-icons/bs";

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

  return (
    <div className="">
      <div
        className=" bg-gray-700 py-20 md:py-28 bg-center bg-cover rounded-lg mt-5"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className="mt-5">
        <h2 className="md:text-2xl font-bold font-sans mb-4 md:my-8 text-gray-700">
          {data?.myRestaurant?.restaurant?.name || "Loading ..."}
        </h2>
        <Link
          to={`/restaurant/${restaurantId}/add-dish`}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm md:px-5 md:py-2.5 px-3 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add a dish &rarr;
        </Link>
        <Link
          to={``}
          className=" text-white bg-teal-700 hover:bg-teal-800 focus:outline-none  focus:ring-teal-300 font-medium rounded-full text-sm md:px-5 md:py-2.5 px-3 py-2 text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Buy Promotion &rarr;
        </Link>
      </div>
      <div className=" mt-5">
        {data?.myRestaurant.restaurant?.menu.length === 0 ? (
          <h4 className=" md:text-2xl font-bold font-sans mb-4 md:my-8 text-gray-700 mt-10">
            Get started by adding a new dish to your restaurant.
          </h4>
        ) : (
          <div className="md:grid md:grid-cols-2 gap-x-6 gap-y-10 ">
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
      <div className="  mt-10 mb-5">
        <div className=" md:text-2xl font-bold font-sans mb-4 md:my-8 text-gray-700 text-center">
          <div className="inline-flex items-center ">
            <BsBarChartLineFill className="mr-2" /> Sales
          </div>
        </div>
        <div className="mt-1 mb-28 shadow-md bg-gray-200 rounded-lg items-center justify-center">
         <>
          <VictoryChart containerComponent={<VictoryVoronoiContainer />}>
            <VictoryLine
              labels={({ datum }) => `$${datum.y}`}
              labelComponent={
                <VictoryLabel style={{ fontSize: 4 }} renderInPortal dy={-5} />
              }
              height={500}
              width={window.innerWidth}
              domainPadding={30}
              theme={VictoryTheme.material}
              data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                x: order.createdAt,
                y: order.total,
              }))}
              interpolation="natural"
              style={{
                data: {
                  stroke: "teal",
                  strokeWidth: "2",
                },
              }}
            />

            <VictoryAxis
              style={{ tickLabels: { fontSize: 3 } }}
              tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
            />
          </VictoryChart>
         </>
        </div>
      </div>
    </div>
  );
};
