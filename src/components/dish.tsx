import React, { useState } from "react";
import { IDishProp } from "../interfaces/dish.interface";
import { CreateOrderItemInput } from "../__generated__/globalTypes";
import { DishOption } from "./dish-options";
import { ModalDish } from "./modal-dish";

export const Dish: React.FC<IDishProp> = ({
  dishId,
  name,
  description,
  price,
  photo,
  isCustomer = false,
  options,
  addItemToOrder,
  removeFromOrder,
  addOptionToItem,
  removeOptionFromItem,
  isSelected,
  getItem,
  orderStarted,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    if (isCustomer && orderStarted) {
      setIsOpen(true);
    }
  };

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem;
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }

    return false;
  };

  return (
    <div>
      <figure
        onClick={onClick}
        className={` bg-white shadow-md rounded-md  flex cursor-pointer border transition duration-500 ease-in-out ${
          isSelected ? "border-gray-500" : ""
        }`}
      >
        <div className=" flex flex-col flex-auto overflow-y-auto p-4 md:space-y-4 ">
          <div className="text-xl leading-6 font-medium text-gray-900">
            {name}
          </div>
          <div className="truncate text-sm text-gray-500 flex-grow">
            {description}
          </div>

          {isCustomer && options?.length !== 0 && (
            <div className="md:flex space-x-1">
              {/* <h5 className="my-3 font-medium">Dish Options</h5> */}
              {options?.slice(0, 2).map((option, index) => (
                <span
                  className="md:flex items-center px-2 md:bg-gray-200 shadow rounded-xl "
                  key={index}
                >
                  <h6 className="mr-2 text-sm ">{option.name}</h6>
                  <h6 className=" text-sm opacity-75 font-semibold hidden lg:block">
                    ( $ {option.extra})
                  </h6>
                </span>
              ))}
            </div>
          )}
          <div className=" text-sm md:text-xl font-bold text-gray-700">
            $ {price}
          </div>
        </div>

        <img
          className="w-auto h-24 xl:h-48 xl:w-auto px-4  mx-auto "
          src={photo}
          alt=""
          width="384"
          height="512"
        />
      </figure>
      {isOpen && (
        <ModalDish
          dishId={dishId}
          photo={photo}
          name={name}
          description={description}
          options={options}
          setIsOpen={setIsOpen}
          addItemToOrder={addItemToOrder}
          removeFromOrder={removeFromOrder}
          isSelected={isSelected!}
        >
          {options?.map((option, index) => (
            <DishOption
              key={index}
              dishId={dishId}
              isSelected={isOptionSelected(dishId!, option.name)}
              name={option.name}
              extra={option.extra}
              addOptionToItem={addOptionToItem!}
              removeOptionFromItem={removeOptionFromItem!}
            />
          ))}
        </ModalDish>
      )}
    </div>
  );
};
