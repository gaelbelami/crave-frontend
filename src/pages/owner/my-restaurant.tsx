import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { Footer } from "../../components/footer";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurantQuery($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(myRestaurantInput: $myRestaurantInput) {
      ok
      message
      restaurant {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
        menu {
          id
          name
          price
          photo
          description
          options {
            name
            extra
            choices {
              name
              extra
            }
          }
        }
      }
    }
  }
`;

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
    <div className="page-container">
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
          <h4 className=" text-2xl mb-5 font-bold text-gray-700 rounded-lg px-5 py-3 flex-wrap text-center">
            Please upload a dish
          </h4>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 mt-10">
            {data?.myRestaurant.restaurant?.menu.map(
              ({ id, name, price, description, photo }) => (
                <Dish
                  key={id}
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
        <div className="max-w-xl w-full mx-auto">
          <VictoryChart>
            <VictoryAxis
              tickFormat={(step) => `$${step / 1000}k`}
              dependentAxis
            />
            <VictoryAxis tickFormat={(step) => `Day ${step}`} />
            <VictoryBar data={chartData} />
          </VictoryChart>
        </div>
      </div>
      <div className="inset-x-4 bottom-0 ">
        <Footer />
      </div>
    </div>
  );
};
