import { useQuery } from "@apollo/client";
import { BiCategory } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import { RestaurantItem } from "../../components/restaurantItem";
import { CATEGORY_QUERY } from "../../graphql/query-mutation";
import {
  categoryQuery,
  categoryQueryVariables,
} from "../../__generated__/categoryQuery";

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
    <section className="md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg mt-5 pb-5">
      <h1 className="text-2xl font-bold font-sans mt-3 inline-flex items-center opacity-80  ">
        <BiCategory />
        &nbsp; {category.name}{" "}
      </h1>
      <p className="text-md font-semibold mt-8 mb-8">
        {data?.category.restaurants?.length} Results found{" "}
      </p>

      <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">
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
  );
};
