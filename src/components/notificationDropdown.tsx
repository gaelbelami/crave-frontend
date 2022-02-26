import React, { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";

const NotificationDropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { data } = useMe();
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={handleClick} type="button">
          <FaBell className=" md:h-5 md:w-5 h-4 w-4 text-gray-700 hover:cursor-pointer" />
        </button>
      </div>
      {showOptions && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 flex flex-col" role="none">
            <div
              className="inline-grid grid-cols-2 items-center text-gray-700 border-b border-1 px-4 py-2 "
              role="menuitem"
            >
              <div className="font-bold ">Notifications</div>
              <span className=" justify-self-end text-xs font-semibold bg-orange-300 bg-opacity-50 rounded-xl px-2">
                1 new
              </span>
            </div>
            <Link
              to="/"
              className="text-gray-700 inline-flex px-4 py-2 mt-1 text-sm hover:bg-gray-100 hover:text-gray-600"
              role="menuitem"
            >
              <div className=" mr-2 p-1 justify-center items-center inline-flex bg-green-200 rounded-full">
                <BsCheck2 className="justify-start items-start md:h-4 md:w-4 h-4 w-4 text-green-500" />
              </div>
              Your order has been successfull
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
