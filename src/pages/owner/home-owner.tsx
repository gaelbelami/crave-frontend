import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MdRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Pagination, usePagination } from '../../components/pagination';
import { RestaurantItem } from '../../components/restaurantItem';
import { myRestaurantsQuery } from '../../__generated__/myRestaurantsQuery';

export const MY_RESTAURANTS_QUERY = gql`
query myRestaurantsQuery {
      myRestaurants {
        ok
        message
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
`
export const MyRestaurant = () => {
  
  const { page, ...restaurantPager } = usePagination(1);
  const {data} = useQuery<myRestaurantsQuery>(MY_RESTAURANTS_QUERY)
  console.log(data);
  return <div className='page-container'>
    <Helmet>
      <title>My restaurants | Crave ~ Food</title>
    </Helmet>

    <h1 className="text-xl font-bold font-sans mt-3 inline-flex items-center opacity-80 py-5  "><MdRestaurantMenu className=' text-2xl mr-2' />My restaurants </h1>

    {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ?
   <div>
     <h4 className=" text-xl mb-5"> You Have no restaurant.</h4>
     <Link className=" text-lime-600 hover:underline" to="add-restaurant">
     CreateOne &rarr;
     </Link>
   </div> : <div className='grid md:grid-cols-3 gap-x-5 gap-y-12'>
        {
          data?.myRestaurants.restaurants.map(restaurant => (
            <RestaurantItem key={restaurant.id} id={restaurant.id} coverImage={restaurant.coverImage} restaurantName={restaurant.name} categoryName={restaurant.category?.name} address={restaurant.address} />
          ))
        }
        {/* Need to pagination here */}
   </div>
   }
  </div>;
};
