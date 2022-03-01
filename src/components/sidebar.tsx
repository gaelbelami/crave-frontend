import React, { Fragment } from "react";
import { MdDeliveryDining, MdOutlineFavorite } from "react-icons/md";
import { SiSnapcraft } from "react-icons/si";
import { Link } from "react-router-dom";
import { IoMdListBox } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="h-screen sticky group top-0 items-center  flex-col bg-white rounded-lg  mb-3 mx-1 pl-1">
      <div className="group-hover transform transition duration-200 ease-in-out">
        <div>
          <Link
            className="inline-flex text-center items-center mb-4 pt-4"
            to="/"
          >
            {/* <img src={logo} alt="crave" className=" w-28" /> */}
            <SiSnapcraft className="ml-4 md:h-10 md:w-10 h-10 w-10  text-orange-500 mt-4" />

            <h2 className="hidden group-hover:block italic font-black my-auto ml-2 mr-4 text-4xl text-orange-500 font-sans">
              crave.
            </h2>
          </Link>
        </div>
        {linksArray.map(({ label, icon, to, notification }) => (
          <Fragment>
            <div className="group hover:bg-gray-100 relative rounded-l-lg">
              <Link
                to="/edit-profile"
                className={`inline-flex   justify-center items-center ml-1  px-5 mt-1 font-semibold text-gray-600`}
                role="menuitem"
              >
                {icon}
                {/* <div className="absolute top-0 right-0 bg-red-500 w-4 h-4 text-xs text-white rounded-full text-center">
                5
              </div> */}
                {/* {label} */}
                <p className="overflow-visible hidden  group-hover:block opacity-0 ml-2 group-hover:opacity-100 text-gray-600 ">
                  {label}
                </p>
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const linksArray = [
  {
    label: "Order",
    icon: (
      <div className=" inline-flex relative w-full h-16 justify-center items-center">
        <MdDeliveryDining className="md:h-9 md:w-9 h-9 w-9 justify-start items-start" />
      </div>
    ),
    to: "/",
    notification: 0,
  },
  {
    label: "Favorites",
    icon: (
      <div className=" inline-flex relative w-full h-16 justify-center items-center">
        <MdOutlineFavorite className="md:h-8 md:w-8 h-8 w-8 justify-start items-start" />
      </div>
    ),
    to: "/statistics",
    notification: 3,
  },
  {
    label: "History",
    icon: (
      <div className=" inline-flex relative w-full h-16 justify-center items-center">
        <IoMdListBox className="md:h-8 md:w-8 h-8 w-8 justify-start items-start" />
      </div>
    ),
    to: "/customers",
    notification: 0,
  },
];

export default Sidebar;
