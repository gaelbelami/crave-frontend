import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { HiUserCircle } from "react-icons/hi";
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
    ) }
      <header className=" mt-3 mx-4 py-5 bg-slate-800 rounded-lg text-center">
        <div className="container flex w-full container items-center justify-between px-5 xl:px-0">
         <Link to="/">
            <img src={logo} alt="crave" className=" w-28" />
          {/* <h2 className="  font-extrabold my-auto text-4xl text-purple-500 font-sans">
            crave
          </h2> */}
         </Link>
          <span className="">
            <Link to="/tabs">
              <HiUserCircle className="text-3xl text-slate-300" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
