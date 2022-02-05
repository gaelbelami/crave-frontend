import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
      <header className=" mt-3 mx-4 py-6 bg-slate-800 rounded-lg text-center">
        <div className=" mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 xl:px-0">
         <Link to="/">
            <img src={logo} alt="crave" className=" w-28" />
          {/* <h2 className="  font-extrabold my-auto text-4xl text-purple-500 font-sans">
            crave
          </h2> */}
         </Link>
          <span className="text-xs">
            <Link to="/tabs">
              <FontAwesomeIcon className="text-2xl text-slate-300" icon={faUserCircle} />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
