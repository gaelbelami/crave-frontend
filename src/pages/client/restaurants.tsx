import { useQuery } from "@apollo/client";
import React from "react";
import { CategoryItem } from "../../components/categoryItem";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../generated/restaurantsPageQuery";
import { RestaurantItem } from "../../components/restaurantItem";
import Banner from "../../components/banner";
import { RestaurantSkeleton } from "../../components/skeletons/restaurant-skeleton";
import { CategorySkeleton } from "../../components/skeletons/category-skeleton";
import { BannerSkeleton } from "../../components/skeletons/banner-skeleton";
import { Pagination, usePagination } from "../../components/pagination";
import { MdRestaurantMenu } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { RESTAURANTS_QUERY } from "../../graphql/query-mutation";

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
    <div className="mb-24 overflow-hidden">

        <title>Home | Crave ~ Food</title>

      {!data || loading ? (
        <div>
          <BannerSkeleton />
          <div className="items-center text-center mx-auto">
            <CategorySkeleton />
          </div>
          <div>
            <div className="text-3xl inline-flex items-center  font-sans font-bold my-8">
              <span className="ml-3 bg-gray-200 px-16 py-3"></span>
            </div>
            <RestaurantSkeleton />
          </div>
        </div>
      ) : (
        <div className="flex flex-row ">
          <div className="flex-auto ">
            <Banner />
            <main className=" bg-white md:max-w-8xl w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg">
              <div className="not-prose relative bg-white">
                <div className="relative  overflow-auto ">
                  <div className="max-w-sm md:max-w-full mx-auto min-w-0">
                    <div className=" overflow-x-auto xs:scrollbar-hide  flex">
                      {data?.allCategories.categories?.map((category) => (
                        <CategoryItem key={category.id} {...category} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="ml-3 md:text-2xl font-bold font-sans inline-flex items-center mb-4 md:my-8 text-gray-700">
                  <MdRestaurantMenu />
                  <span className="ml-3">Restaurants</span>
                </div>

                <div className="grid md:grid-cols-3 gap-x-5 gap-y-6 mx-3">
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
