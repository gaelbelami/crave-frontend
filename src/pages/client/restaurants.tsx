import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Category } from "../../components/category";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { IoRestaurantSharp } from "react-icons/io5";
import { Restaurant } from "../../components/restaurant";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
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
        address
      }
    }
  }
`;

const Restaurants = () => {
  const [page,setPage] = useState(1)
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: {
        page: page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPreviousPageClick = () => setPage((current) => current - 1);

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
        <div className="container mt-8 pb-52">
          <div className="flex gap-5 mt-5 w-full mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Category {...category} />
            ))}
          </div>
          <div className="text-3xl inline-flex items-center  font-sans font-bold mt-8">
            <IoRestaurantSharp />
            <span className="ml-3">
              Restaurants
            </span>
          </div>

          <div className="grid grid-cols-3 gap-x-5 gap-y-12 mt-10">
            {data?.getAllRestaurnants.results?.map((restaurant) => (
              <Restaurant id={restaurant.id} coverImage={restaurant.coverImage } restaurantName={restaurant.name} categoryName={restaurant.category?.name} address={restaurant.address} />
            ))}
          </div>
 
          <div className="grid grid-cols-3 max-w-md justify-center items-center mx-auto  mt-10">
            {page > 1 ? <button onClick={onPreviousPageClick} className=" basis-1/3 focus:outline-none font-medium text-2xl"><BsArrowLeftSquareFill /></button> : <div></div>}
            <span className="basis-1/3">Page {page} of {data?.getAllRestaurnants.totalPages}</span>
            {page !==  data?.getAllRestaurnants.totalPages ? (<button onClick={onNextPageClick} className=" basis-1/3 focus:outline-none font-medium text-2xl"><BsArrowRightSquareFill /></button>) : <div></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
