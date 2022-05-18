import { useQuery } from "@apollo/client";
import { BiCategory } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import { RestaurantItem } from "../../components/restaurantItem";
import { CATEGORY_QUERY } from "../../graphql/query-mutation";
import {
  categoryQuery,
  categoryQueryVariables,
} from "../../generated/categoryQuery";

export const Category = () => {
  const { categorySlug } = useParams() as { categorySlug: string };

  const { data } = useQuery<categoryQuery, categoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        categoryInput: {
          page: 1,
          categorySlug,
        },
      },
    }
  );

  const location = useLocation();
  const category: any = location.state;
  return (
    <div className="min-h-screen">
      <section className="md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 bg-white shadow-md rounded-lg mt-5 p-3 mb-20 ">
        <h1 className="ml-3 md:text-2xl font-bold font-sans inline-flex items-center mb-4 md:my-8 text-gray-700">
          <BiCategory />
          &nbsp; {category.name}{" "}
        </h1>
        <p className=" mt-2 md:mt-8 mb-8 ml-3 md:text-xl text-gray-500 text-xs font-sans font-medium md:font-bold dark:text-slate-600">
          {data?.category.restaurants?.length} Results found{" "}
        </p>

        <div className="grid md:grid-cols-3 gap-x-5 gap-y-6">
          {data?.category.restaurants?.map((restaurant) => (
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
      </section>
    </div>
  );
};
