import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { restaurantQuery_restaurant_restaurant_menu_options } from "../__generated__/restaurantQuery";

interface IModal {
  photo: string;
  name: string;
  description: string;
  options?: restaurantQuery_restaurant_restaurant_menu_options[] | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDish: React.FC<IModal> = ({
  photo,
  name,
  description,
  options,
  setIsOpen,
}) => {
  const onClick = () => {
    setIsOpen(false);
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

        <div className="z-40 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="inline-flex items-center   w-full justify-between">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 "
                    id="modal-title"
                  >
                    {name}
                  </h3>
                  <div
                    onClick={onClick}
                    className="cursor-pointer hover:bg-red-200  mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <AiOutlineClose className=" text-red-500" />
                  </div>
                </div>

                <div className="mt-2 flex">
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
                  <h3 className=" text-lg font-semibold text-gray-800 leading-6">
                    Choose Your options
                  </h3>
                  <div className="mt-2">
                    {options?.map((option) => (
                      <h2
                        key={option.name}
                        className=" text-sm font-semibold text-gray-500"
                      >
                        <input
                          type="checkbox"
                          className=" checked:bg-blue-500 rounded border mr-2"
                        />
                        {option.name}
                      </h2>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className=" text-lg font-semibold text-gray-800 leading-6">
                    Choose Your Add Ons
                  </h3>
                  <div className="mt-2">
                    <h2 className=" text-sm font-semibold text-gray-500 mt-2">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 rounded border mr-2"
                      />
                      Avocado
                    </h2>
                    <h2 className=" text-sm font-semibold text-gray-500 mt-2">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 rounded border mr-2"
                      />
                      BBQ Sauce
                    </h2>
                    <h2 className=" text-sm font-semibold text-gray-500 mt-2">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 rounded border mr-2"
                      />
                      Ketchup
                    </h2>
                    <h2 className=" text-sm font-semibold text-gray-500 mt-2">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 rounded border mr-2"
                      />
                      Lettuce
                    </h2>
                    <h2 className=" text-sm font-semibold text-gray-500 mt-2">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 rounded border mr-2"
                      />
                      Tomato
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add to cart
            </button>
            <div>
              <div className=" cursor-pointer  mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                <IoRemoveOutline />
              </div>
              <div className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                1
              </div>
              <div className=" cursor-pointer  mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                <IoAddOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
