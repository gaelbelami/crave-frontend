import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaHamburger } from "react-icons/fa";
import { HiSearch, HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import logo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-2 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" mt-3 mx-4 py-5 bg-slate-800 rounded-lg text-center">
        <div className="container flex w-full container items-center justify-between px-5 xl:px-0">
          <Link className=" inline-flex items-center gap-2 justify-center" to="/">
            {/* <img src={logo} alt="crave" className=" w-28" /> */}
            <FaHamburger className=" text-3xl text-orange-500" />
            <h2 className=" italic  font-extrabold my-auto text-4xl text-orange-500 font-sans">
              crave.
            </h2>
          </Link>

          <form className=" bg-gray-700 w-3/4 md:w-3/12 md:shadow-sm rounded-full flex items-center md:border-1  py-2 ">
            <input
              className=" text-white font-sans placeholder-gray-400  font-medium flex-grow pl-5 bg-transparent outline-none"
              type="search"
              placeholder="Search restaurant..."
            />
            <HiSearch className=" md:mx-2 h-8 w-8 bg-orange-500 hidden md:inline-flex text-black rounded-full p-2 cursor-pointer  hover:shadow-2xl active:scale-90 transition duration-150" />
          </form>

          <span className="">
            <Link to="/tabs">
              <HiUserCircle className="text-3xl  text-orange-500" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
