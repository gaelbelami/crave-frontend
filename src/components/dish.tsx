import React from "react";

interface IDishProp {
  name: string;
  description: string;
  price: number;
  photo: string;
}

export const Dish: React.FC<IDishProp> = ({
  name,
  description,
  price,
  photo,
}) => {
  return (
    <figure className=" shadow-md rounded-md flex cursor-pointer">
      <div className=" p-3 basis-2/3 relative">
        <div className="relative  overflow-ellipsis  break-words">
          <h2 className=" relative font-bold text-gray-700 md:text-xl">
            {name}
          </h2>
          <div className="relative  mt-2">{description}</div>
        </div>

        <div className="absolute bottom-2 font-bold text-orange-500 justify-end text-xl">
          $ {price}
        </div>
      </div>
      <img
        className="w-24 h-24 md:h-48 md:w-auto md:rounded-none rounded-full mx-auto"
        src={photo}
        alt=""
        width="384"
        height="512"
      />
    </figure>
  );
};
