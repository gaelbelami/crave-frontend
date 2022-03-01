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
      <div className=" flex flex-col flex-auto overflow-y-auto rounded-l-lg p-3 space-y-2">
        <div className=" font-bold text-xl">{name}</div>
        <div className="truncate flex-grow">{description}</div>
        <div className="justify-end text-xl font-bold text-orange-500">
          $ {price}
        </div>
      </div>

      <img
        className="w-24 h-24 md:h-48 px-4 md:w-auto md:rounded-none rounded-full mx-auto"
        src={photo}
        alt=""
        width="384"
        height="512"
      />
    </figure>
  );
};
