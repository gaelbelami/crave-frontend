import React from "react";
import { BiCategory } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { ImLocation } from "react-icons/im";
import { IRestaurantProps } from "../interfaces/restaurant.interface";


export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImage,
  restaurantName,
  categoryName,
  address,
}) => ( 
  <div className="group flex flex-col cursor-pointer">
    <div className=" group-hover:scale-105 transition-all duration-200 ease-linear ">
      <div
        className="py-28 bg-cover mb-2 bg-center rounded-lg "
       
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>

      <div className="inline-flex text-lg items-center mb-2">
        <GiShoppingBag />
        <h3 className="font-sans font-bold ml-2">{restaurantName}</h3>
      </div>
      <div className="border-t border-gray-300 flex justify-between">
        <span className=" text-gray-500 inline-flex items-center  p-1 mt-2 text-xs font-semibold">
          <BiCategory /> {categoryName}
        </span>
        <span className=" text-gray-500 inline-flex items-center  p-1 mt-2 text-xs font-semibold">
          <ImLocation /> {address}
        </span>
      </div>
    </div>
  </div>
);
