import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Pagination, usePagination } from "../../components/pagination";
import { RestaurantItem } from "../../components/restaurantItem";
import {
  myRestaurantsQuery,
  myRestaurantsQueryVariables,
} from "../../__generated__/myRestaurantsQuery";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurantsQuery($myRestaurantsInput: MyRestaurantsInput!) {
    myRestaurants(myRestaurantsInput: $myRestaurantsInput) {
      ok
      message
      totalPages
      totalResults
      results {
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
    <div className="h-screen relative mt-5">
      <Helmet>
        <title>My restaurants | Crave ~ Food</title>
      </Helmet>
      <div>
        <main className=" bg-white md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg">
          <h1 className="text-xl font-bold font-sans mt-3 inline-flex items-center opacity-80 py-5  ">
            <MdRestaurantMenu className=" text-2xl mr-2" />
            My restaurants{" "}
          </h1>

          {data?.myRestaurants.ok && data.myRestaurants.results.length === 0 ? (
            <div>
              <h4 className=" text-xl mb-5"> You Have no restaurant.</h4>
              <Link
                className=" text-lime-600 hover:underline"
                to="add-restaurant"
              >
                CreateOne &rarr;
              </Link>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">
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
