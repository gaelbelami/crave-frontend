import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RestaurantItem } from "../../components/restaurantItem";
import { SEARCH_RESTAURANT } from "../../graphql/query-mutation";
import {
  searchRestaurantQuery,
  searchRestaurantQueryVariables,
} from "../../__generated__/searchRestaurantQuery";

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
    <div className="flex">
      <section className="flex-grow pt-6 px-6">
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
    </div>
  );
};
