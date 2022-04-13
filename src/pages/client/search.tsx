import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RestaurantItem } from "../../components/restaurantItem";
import { SEARCH_RESTAURANT } from "../../graphql/query-mutation";
import {
  searchRestaurantQuery,
  searchRestaurantQueryVariables,
} from "../../__generated__/searchRestaurantQuery";
import preview from "../../images/preview.gif";

export const Search = () => {
  const history = useNavigate();
  const location = useLocation();
  const [callQuery, { data }] = useLazyQuery<
    searchRestaurantQuery,
    searchRestaurantQueryVariables
  >(SEARCH_RESTAURANT);

  const [_, query] = location.search.split("?term=");
  useEffect(() => {
    if (!query) {
      return history("/");
    }
    callQuery({
      variables: {
        searchRestaurantInput: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, callQuery, query]);

  return (
    <div className="min-h-screen">
      {data?.searchRestaurant.totalResults === 0 ? (
        <>
          <div className="w-full min-h-screen flex flex-col justify-items-center bg-gray-50 items-center justify-center">
            <div className="font-sans font-semibold text-3xl text-gray-600">
              No Restaurant Found
              <span className=" text-teal-600"> "{query}"</span>
            </div>
            <img src={preview} alt="" className="opacity-80" />
          </div>
        </>
      ) : (
        <section className="flex-grow pt-6 px-6 md:px-8 sm:px-16  shadow-md rounded-lg mt-5 pb-5 ">
          <h1 className="text-3xl font-semibold mt-3 "> Search: {query} </h1>
          <p className="text-md font-semibold py-10">
            {data?.searchRestaurant.totalResults} Results found
          </p>

          <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">
            {data?.searchRestaurant.restaurants?.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                coverImage={restaurant.coverImage}
                restaurantName={restaurant.name}
                id={restaurant.id}
                address={restaurant.address}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
