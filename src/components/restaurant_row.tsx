import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { HiHeart } from "react-icons/hi";
import { IRestaurant } from "../interfaces/restaurant.interface";

export const RestaurantRow: React.FC<IRestaurant> = ({
  coverImage,
  restaurantName,
  address,
  categoryName,
}) => {
  console.log(restaurantName);
  return (
    <div className=" mt-5 flex">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <div
          className="py-28 bg-cover mb-2 bg-center rounded-lg "
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <div className=" text-3xl font-sans font-semibold inline-flex items-center space-x-2">
            <GiShoppingBag />
            <p>{restaurantName}</p>
          </div>

          <HiHeart className="h-7 w-7 cursor-pointer" />
        </div>

        <div className=" border-b w-10 pt-2" />
        <h4 className="text-xl">{categoryName}</h4>
      </div>
    </div>
  );
};
