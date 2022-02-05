import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Category } from "../../components/category";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($restaurantsInput: RestaurantsInput!) {
    allCategories {
      ok
      message
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }

    getAllRestaurnants(restaurantsInput: $restaurantsInput) {
      ok
      message
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          id
          name
        }
        isPromoted
      }
    }
  }
`;

const Restauraunts = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: {
        page: 1,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <form className="page-container  bg-gray-800 mt-10 p-40 flex items-center justify-center ">
        <input
          className="search-input"
          type="search"
          placeholder="Search restaurant..."
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <div className="flex gap-7 mt-5 w-full mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Category {...category} />
            ))}
          </div>
          <div>
            {data?.getAllRestaurnants.results?.map((restaurant) => (
              <div className="grip grid-cols-3 gap-7 mt-10">
                  <div className=" bg-red-500 py-28"></div>
                  <h3>{restaurant.name}</h3>
                  <span>{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restauraunts;
