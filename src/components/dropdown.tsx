import React, { useState } from "react";
import { IconType } from "react-icons";
import { HiUser, HiUserCircle } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";

const Dropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const {data} = useMe();
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={handleClick}
            type="button"
            className="inline-flex justify-center w-full"
          >
            <HiUserCircle className=" md:h-9 md:w-9 h-8 w-8 text-orange-500" />
          </button>
        </div>
        {showOptions && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1 flex flex-col" role="none">              
                  <div
                    className="text-gray-700 flex flex-col border-b border-1 px-4 py-2 text-sm "
                    role="menuitem"
                  >                    
                   Signed in as 
                   <span className=" font-bold">

                  {data?.me.firstName}
                   </span>
                  </div>
                  <Link
                    to="/edit-profile"
                    className="text-gray-700 inline-flex px-4 py-2 mt-1 text-sm hover:bg-orange-200 hover:text-orange-600"
                    role="menuitem"
                  >
                    <HiUser className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                   Profile
                  </Link>
                  <Link
                    to="/account-settings"
                    className="text-gray-700 inline-flex px-4 py-2 text-sm hover:bg-orange-200 hover:text-orange-600 "
                    role="menuitem"
                  >
                    <MdSettings className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                   Settings
                  </Link>
                  <Link
                    to="/signout"
                    className="text-gray-700 inline-flex px-4 py-2 mb-1 text-sm hover:bg-orange-200 hover:text-orange-600"
                    role="menuitem"
                  >
                    <IoLogOut className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                   Sign out
                  </Link>
                
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
