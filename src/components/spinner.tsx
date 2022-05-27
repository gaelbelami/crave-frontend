import React from "react";
import { FaHamburger } from "react-icons/fa";
import BarLoader from "react-spinners/BarLoader";

function Spinner({ loading }: any) {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className=" flex items-center justify-center space-x-3 ">
        {/* <FaHamburger className=" text-5xl text-teal-600" /> */}
        <span className="md:flex md:ml-1 italic font-extrabold md:text-4xl text-teal-600">
          cr
          <FaHamburger className="md:w-5 md:h-5 mt-4 mx-0.5" />
          ve
        </span>
      </div>
      <BarLoader color={"#008080"} loading={loading} height={8} width={200} />
    </div>
  );
}

export default Spinner;
