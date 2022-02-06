import { BiHeart } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";

export const Footer = () => {
  return (

    <div className="rounded-lg py-5 mt-5  bg-gray-100 grid-cols-1 md:grid-cols-3  font-sans font-semibold  flex items-center justify-between">
      <div className=" flex flex-col  space-y-3   ml-5 text-xs text-gray-800">
        <h5 className=" inline-flex items-center">
          COPYRIGHT ©2022 &nbsp; <FaHamburger className=" text-md" />
          Crave.
        </h5>
      </div>
      <div className=" flex flex-col  space-y-3 text-xs text-gray-800">
        <h5>All rights Reserved</h5>
      </div>
      <div className=" flex flex-col space-y-3 mr-5 text-xs text-gray-800">
        <h5 className=" inline-flex items-center">
          Made with passion &nbsp; <BiHeart className=" text-md" />
        </h5>
      </div>
    </div>
  );
};
