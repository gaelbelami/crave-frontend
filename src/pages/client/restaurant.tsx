import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dish } from "../../components/dish";
import { Footer } from "../../components/footer";
// import { IRestaurantParams } from '../../interfaces/restaurant.interface';
import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../../__generated__/restaurantQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantQuery($restaurantInput: RestaurantInput!) {
    restaurant(restaurantInput: $restaurantInput) {
      ok
      message
      restaurant {
        id
        name
        coverImage
        category {
          name
          slug
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

export const Restaurant = () => {
  const location = useLocation();
  const restaurantId: any = location.state;

  const { data, loading } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        restaurantInput: {
          restaurantId: +restaurantId,
        },
      },
    }
  );

  return (
    <div>
      {loading ? (
        <div className=" page-container bg-gray-200 animate-pulse mt-5 bg-center bg-cover py-48">
          <div className=" ml-8 bg-white w-3/12 py-8 rounded-md shadow-md">
            <div className="flex">
              <div className="ml-4 text-4xl mb-3 py-5 px-10 bg-gray-200 animate-pulse font-mono font-semibold "></div>
              <div className="flex-grow"></div>
            </div>

            <div className="flex  mb-5">
              <div className="flex-none bg-gray-200 animate-pulse  shadow-md py-2 px-5 rounded-2xl ml-4 "></div>
              <div className="flex-grow"></div>
            </div>
            <div className="flex">
              <div className=" ml-4 text-sm py-2 px-5 bg-gray-200 animate-pulse"></div>
              <div className="flex-grow"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" page-container mt-5 bg-center bg-cover py-48 shadow-md"
          style={{
            backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
          }}
        >
          <div className=" ml-8 bg-white w-3/12 py-8 rounded-md shadow-md">
            <h4 className="ml-4 text-4xl mb-3 font-mono font-semibold ">
              {data?.restaurant.restaurant?.name}
            </h4>
            <Link
              to={`/category/${data?.restaurant.restaurant?.category?.slug}`}
              state={data?.restaurant.restaurant?.category?.slug}
            >
              <div className="flex  mb-5">
                <h4 className="flex-none text-xs font-bold shadow-md bg-gray-200 py-1 px-2 rounded-2xl ml-4 ">
                  {data?.restaurant.restaurant?.category?.name}
                </h4>
                <div className="flex-grow"></div>
              </div>
            </Link>
            <h6 className=" ml-4 text-sm">
              {data?.restaurant.restaurant?.address}
            </h6>
          </div>

          <div className="fixed inset-x-4 bottom-0 ">
            <Footer />
          </div>
        </div>
      )}
      <div className="page-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mt-10">
          {data?.restaurant.restaurant?.menu.map(
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
      </div>
    </div>
  );
};
