import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchRestaurantMutation,
  searchRestaurantMutationVariables,
} from "../../__generated__/searchRestaurantMutation";

const SEARCH_RESTAURANT = gql`
  query searchRestaurantMutation(
    $searchRestaurantInput: SearchRestaurantInput!
  ) {
    searchRestaurant(searchRestaurantInput: $searchRestaurantInput) {
      ok
      message
      totalPages
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Search = () => {
  const history = useNavigate();
  const location = useLocation();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurantMutation,
    searchRestaurantMutationVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");
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
  }, [history, location]);
  console.log(loading, data, called);
  return <h1>hello</h1>;
};
