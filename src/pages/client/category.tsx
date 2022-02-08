import { gql, useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { ICategory } from "../../interfaces/category";
import {
  categoryQuery,
  categoryQueryVariables,
} from "../../__generated__/categoryQuery";

const CATEGORY_QUERY = gql`
  query categoryQuery($categoryInput: CategoryInput!) {
    category(categoryInput: $categoryInput) {
      ok
      message
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

export const Category = () => {
  const { categorySlug } = useParams() as { categorySlug: string };

  const { data, loading } = useQuery<categoryQuery, categoryQueryVariables>(
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
    <div className="page-container">
      <section className="md:max-w-8xl max-w-full mx-auto md:px-8 sm:px-16 shadow-md rounded-lg mt-5 pb-5">
          <h1 className="text-2xl font-semibold mt-3 "> category: {category.name} </h1>
        <p className="text-md font-semibold py-10">{category.totalResults} Results found </p>
      
        <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">
          {data?.category.restaurants?.map((restaurant) => (
            <Restaurant
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
