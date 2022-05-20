import React, { Fragment } from "react";
import { HiUser } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Menu, Transition } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { LOCALSTORAGE_TOKEN } from "../constants/constants";

const AccountDropdown = () => {
  const { data } = useMe();
  const logout = () => {
    localStorage.clear();
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    window.location.reload();
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <Fragment>
            <Menu.Button
              type="button"
              className="inline-flex justify-self-end w-full outline-none"
            >
              <span>
                {data?.me.avatar ? (
                  <img
                    className="w-8 h-8  md:w-10 md:h-10 rounded-full shadow-md bg-gray-100 bg-center object-cover"
                    src={`${data?.me.avatar}`}
                    alt="profile"
                    width="384"
                    height="512"
                  />
                ) : (
                  <div className="  flex items-center w-8 h-8 md:w-10 md:h-10  rounded-full shadow-md bg-gray-300 bg-center object-cover">
                    <FaUser className=" mx-auto text-gray-500" />
                  </div>
                )}
              </span>
            </Menu.Button>

            <Transition
              show={open}
              enter="transform transition duration-200 easy-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition duration-75 ease-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items
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
                    <span className=" font-bold">{data?.me.firstName}</span>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/edit-profile"
                        className={`inline-flex px-4 py-2 mt-1 text-sm text-gray-700
                  
                  ${active && "bg-gray-200"}
                  
                  `}
                        role="menuitem"
                      >
                        <HiUser className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/account-settings"
                        className={`inline-flex px-4 py-2 mt-1 text-sm text-gray-700
                  
                  ${active && "bg-gray-200"}
                  
                  `}
                        role="menuitem"
                      >
                        <MdSettings className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={logout}
                        className={`inline-flex px-4 py-2 mt-1 text-sm text-gray-700
                  
                  ${active && "bg-gray-200"}
                  
                  `}
                        role="menuitem"
                      >
                        <IoLogOut className=" md:h-4 md:w-4 h-4 w-4 mr-2 justify-start items-start" />
                        Sign out
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

export default AccountDropdown;
