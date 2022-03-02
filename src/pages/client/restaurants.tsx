import { gql, useQuery } from "@apollo/client";
import React from "react";
import { CategoryItem } from "../../components/categoryItem";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { RestaurantItem } from "../../components/restaurantItem";
import { Footer } from "../../components/footer";
import Banner from "../../components/banner";
import { RestaurantSkeleton } from "../../components/skeletons/restaurant-skeleton";
import { CategorySkeleton } from "../../components/skeletons/category-skeleton";
import { BannerSkeleton } from "../../components/skeletons/banner-skeleton";
import { Pagination, usePagination } from "../../components/pagination";
import { MdRestaurantMenu } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
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
  const { page, ...restaurantPager } = usePagination(1);
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

  return (
    <div className="mb-24">
      <Helmet>
        <title>Home | Crave ~ Food</title>
      </Helmet>
      {loading ? (
        <div>
          <BannerSkeleton />
          <CategorySkeleton />
          <div className="text-3xl inline-flex items-center  font-sans font-bold my-8">
            <MdRestaurantMenu />
            <span className="ml-3">Restaurants</span>
          </div>
          <RestaurantSkeleton />
        </div>
      ) : (
        <div className="flex flex-row ">
          <div className="flex-auto ">
            <Banner />
            <main className=" bg-white md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg">
              <div className="flex space-x-6 overflow-scroll scrollbar-hide items-center text-center mx-auto">
                {data?.allCategories.categories?.map((category) => (
                  <CategoryItem key={category.id} {...category} />
                ))}
              </div>
              <div className="text-2xl font-bold font-sans inline-flex items-center my-8 text-gray-700">
                <MdRestaurantMenu />
                <span className="ml-3">Restaurants</span>
              </div>

              <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">
                {data?.getAllRestaurnants.results?.map((restaurant) => (
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
                totalPages={data?.getAllRestaurnants.totalPages ?? 1}
                onNextPageClick={restaurantPager.onNextPage}
                onPreviousPageClick={restaurantPager.onPrevPage}
              />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
