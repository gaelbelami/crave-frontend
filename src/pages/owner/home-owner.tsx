import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { Pagination, usePagination } from "../../components/pagination";
import { RestaurantItem } from "../../components/restaurantItem";
import { MY_RESTAURANTS_QUERY } from "../../graphql/query-mutation";
import {
  myRestaurantsQuery,
  myRestaurantsQueryVariables,
} from "../../__generated__/myRestaurantsQuery";

export const HomeOwner = () => {
  const { page, ...restaurantPager } = usePagination(1);
  const { data } = useQuery<myRestaurantsQuery, myRestaurantsQueryVariables>(
    MY_RESTAURANTS_QUERY,
    {
      variables: {
        myRestaurantsInput: {
          page,
        },
      },
    }
  );
  return (
    <div className=" min-h-screen relative mt-5">
      <Helmet>
        <title>My restaurants | Crave ~ Food</title>
      </Helmet>
      <div className="mb-20">
        <main className=" bg-white md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg">
          <div className="ml-3 mt-5 md:text-2xl font-bold font-sans inline-flex items-center mb-4 md:my-8 text-gray-700">
            <MdRestaurantMenu />
            <span className="ml-3">Restaurants</span>
          </div>

          {data?.myRestaurants.ok && data.myRestaurants.results.length === 0 ? (
            <div>
              <h4 className=" text-xl mb-5"> You Have no restaurant.</h4>
              <Link
                className=" text-teal-600 hover:underline"
                to="add-restaurant"
              >
                CreateOne &rarr;
              </Link>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-3 gap-x-5 gap-y-6 mx-3">
                {data?.myRestaurants.results.map((restaurant) => (
                  <RestaurantItem
                    key={restaurant.id}
                    id={restaurant.id}
                    coverImage={restaurant.coverImage}
                    restaurantName={restaurant.name}
                    categoryName={restaurant.category?.name}
                    address={restaurant.address}
                  />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={data?.myRestaurants.totalPages ?? 1}
                onNextPageClick={restaurantPager.onNextPage}
                onPreviousPageClick={restaurantPager.onPrevPage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
