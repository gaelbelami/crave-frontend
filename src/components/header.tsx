import React from "react";
import { useForm } from "react-hook-form";
import { FaHamburger } from "react-icons/fa";
import { HiSearch, HiUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
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
      search: `?term=${searchTerm}`
    })
  }
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-2 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" page-container sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10 rounded-lg">
        
          
          {/* left */}
          <div className="relative flex items-center h-10 cursor-pointer my-auto">
            <Link className=" inline-flex items-center gap-2 justify-center" to="/">
            {/* <img src={logo} alt="crave" className=" w-28" /> */}
            <FaHamburger className=" text-3xl text-orange-500" />
            <h2 className=" italic  font-extrabold my-auto text-4xl text-orange-500 font-sans">
              crave.
            </h2>
          </Link>
          </div>

          {/* Middle */}

          <form  onSubmit={handleSubmit(onSearchSubmit)} className=" md:shadow-sm rounded-full flex items-center md:border-2  py-2">
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
            <HiSearch onClick={handleSubmit(onSearchSubmit)} className=" animate-pulse md:mx-2 h-8 w-8 bg-orange-500 hidden md:inline-flex text-white rounded-full p-2 cursor-pointer  hover:shadow-2xl active:scale-90 transition duration-150" />
          </form>

          {/* Right */}
          <div className="flex items-center justify-end"> 
            <Link to="/tabs">
              <HiUserCircle className=" md:h-10 md:w-10 h-8 w-8 text-orange-500" />
            </Link>
            
          </div>

          {searchTerm && <div className="flex flex-col col-span-3 mx-auto">
            <div className=""></div>
            </div>}
        
      </header>
    </>
  );
};
