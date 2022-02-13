import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from "../../__generated__/myRestaurantQuery";

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

  return (
    <div className="page-container">
      <div
        className=" bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className=" mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant?.restaurant?.name || "Loading ..."}
        </h2>
        <Link to={`/restaurant/${restaurantId}/add-dish`} className=" text-white bg-gray-800 py-3 px-10 mr-8">
        Add a dish &rarr;
        </Link>
        <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
      </div>
      <div className=" mt-5">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
              <h4 className=" text-xl mb-5">Please upload a dish</h4>
          ) : null }
      </div>
    </div>
  );
};
