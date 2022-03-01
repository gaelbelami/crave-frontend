import React from "react";
import { useForm } from "react-hook-form";
import { SiSnapcraft } from "react-icons/si";
import { HiSearch } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import AccountDropdown from "./accountDropdown";
import { UserRole } from "../__generated__/globalTypes";
import NotificationDropdown from "./notificationDropdown";
// import logo from "../images/logo.svg";

interface ISearchFormProps {
  searchTerm: string;
}

export const Header: React.FC = () => {
  const { data } = useMe();
  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const history = useNavigate();
  const { searchTerm } = getValues();
  const onSearchSubmit = () => {
    history({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-2 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header
        className={
          " page-container sticky top-0 z-50 grid  bg-white shadow-md p-3 md:pl-10 md:pr-5 rounded-lg " +
          (data?.me.role === UserRole.client ? "grid-cols-3" : "grid-cols-2")
        }
      >
        {/* left */}
        <div className="relative h-10 cursor-pointer my-auto">
          <Link className="inline-flex text-center items-center gap-1 " to="/">
            {/* <img src={logo} alt="crave" className=" w-28" /> */}
            <SiSnapcraft className=" text-3xl text-orange-500 mt-1" />
            <h2 className=" italic font-black my-auto text-4xl text-orange-500 font-sans">
              crave.
            </h2>
          </Link>
        </div>

        {/* Middle */}

        {data?.me.role === UserRole.client && (
          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            className=" md:shadow-sm rounded-full flex items-center md:border-2  py-2"
          >
            <input
              {...register("searchTerm", {
                required: "Min 3 characters for the search term",
                minLength: 3,
              })}
              autoComplete="off"
              className=" text-gray-600 font-sans placeholder-gray-400 flex-grow pl-5 bg-transparent outline-none"
              type="text"
              placeholder="Search restaurant..."
            />
            <HiSearch
              onClick={handleSubmit(onSearchSubmit)}
              className=" animate-pulse md:mx-2 h-8 w-8 bg-orange-500 hidden md:inline-flex text-white rounded-full p-2 cursor-pointer  hover:shadow-2xl active:scale-90 transition duration-150"
            />
          </form>
        )}

        {/* Right */}
        <div className=" flex  items-center justify-end">
          <div className="flex">
            <FaShoppingCart className=" md:h-5 md:w-5 h-4 w-4 text-gray-700 hover:cursor-pointer mx-3" />

            <NotificationDropdown />
          </div>
          <div className="ml-2 inline-flex gap-2 items-center justify-center px-2">
            <AccountDropdown />
          </div>
        </div>

        {searchTerm && (
          <div className="flex flex-col col-span-3 mx-auto">
            <div className=""></div>
          </div>
        )}
      </header>
    </>
  );
};
