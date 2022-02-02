import { faUser } from "@fortawesome/free-regular-svg-icons";
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
      <header className="py-6">
        <div className=" mx-auto flex w-full max-w-screen-xl items-center justify-between px-5 xl:px-0">
          {/* <img src={logo} alt="crave" className=" w-24" /> */}
          <h2 className="  font-extrabold text-4xl text-purple-500 font-sans">
            crave
          </h2>
          <span className="text-xs">
            <Link to="/my-profile">
              <FontAwesomeIcon className="text-xl" icon={faUser} />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
