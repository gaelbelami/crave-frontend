import { BiHeart } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="flex-grow  absolute inset-x-0 bottom-0 px-5 rounded-xl shadow-md mb-1 py-5 bg-white grid-cols-1 lg:grid-cols-3  font-sans font-semibold  flex items-center justify-between">
      <div className=" flex flex-grow  text-xs text-gray-800">
        <h5 className=" inline-flex items-center">
          COPYRIGHT ©2022 &nbsp; <FaHamburger className=" text-md" />
          Crave.
        </h5>
      </div>
      <div className=" md:flex flex-grow text-xs text-gray-800  hidden ">
        <h5>All Rights Reserved.</h5>
      </div>
      <div className=" md:flex  text-xs text-gray-800  hidden ">
        <h5 className=" inline-flex items-center">
          Made with passion &nbsp;{" "}
          <BiHeart className=" text-red-500 animate-ping text-md" />
        </h5>
      </div>
    </div>
  );
};
