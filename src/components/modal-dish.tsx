import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { restaurantQuery_restaurant_restaurant_menu_options } from "../generated/restaurantQuery";
import ToastAutoClose from "./toast";
import "react-toastify/dist/ReactToastify.css";

interface IModal {
  dishId?: number;
  photo: string;
  name: string;
  description: string;
  options?: restaurantQuery_restaurant_restaurant_menu_options[] | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected: boolean;
}

export const ModalDish: React.FC<IModal> = ({
  dishId = 0,
  photo,
  name,
  description,
  setIsOpen,
  isSelected,
  addItemToOrder,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
    ToastAutoClose({
      typeState: 3,
      message: "Dish added successfully",
      title: "Success",
    });
  };

  return (
    <div className=" bg-slate-800 bg-opacity-50 absolute inset-0 justify-items-center items-center">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 transition-all ease-in-out duration-300">
        <div
          onClick={onClick}
          className="animated fadeInUp fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="z-40 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-10/12">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="inline-flex items-center   w-full justify-between">
                  <h3
                    className="font-sans font-bold text-sm md:text-xl leading-6 text-gray-600"
                    id="modal-title"
                  >
                    {name}
                  </h3>
                  <div className=" justify-end">
                    <div
                      onClick={onClick}
                      className="cursor-pointer hover:bg-red-200  mx-auto flex-shrink-0 flex items-center justify-center md:h-12 md:w-12 w-6 h-6 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <AiOutlineClose className=" text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 flex-grow">
                    {description}
                  </p>
                </div>
                <div className=" bg-gray-50">
                  <img
                    className="w-auto h-56 bg-center object-cover my-5 mx-auto"
                    src={`${photo}`}
                    alt="profile"
                    width="384"
                    height="512"
                  />
                </div>

                <div>
                  <h3 className="font-sans font-bold text-sm md:text-xl leading-6 text-gray-600">
                    Choose Your options
                  </h3>
                  {dishOptions}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  items-end">
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
              {isSelected ? (
                <>
                  <button
                    onClick={() => removeFromOrder && removeFromOrder(dishId)}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm md:px-4 md:py-2 px-3 py-1 mr-2 bg-red-500 text-sm md:text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Remove
                  </button>
                  <button
                    onClick={onConfirm}
                    type="button"
                    className=" inline-flex justify-center rounded-md border border-transparent shadow-sm md:px-4 md:py-2 px-3 py-1 bg-teal-600 text-sm md:text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirm
                  </button>

                  {/* <button
                  
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel Order
                </button> */}

                  {/* <div>
                  <div
                    
                    className=" cursor-pointer  mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <IoRemoveOutline />
                  </div>
                  <div className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    {itemQuantity}
                  </div>
                  <div
                    
                    className=" cursor-pointer  mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <IoAddOutline />
                  </div>
                </div> */}
                </>
              ) : (
                <button
                  onClick={() => {
                    if (addItemToOrder) {
                      addItemToOrder(dishId);
                    }
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm md:px-4 md:py-2 px-4 py-2 bg-teal-600 text-sm md:text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
