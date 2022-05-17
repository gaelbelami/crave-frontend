import React from "react";
import BarLoader from "react-spinners/BarLoader";

function Spinner({ loading }: any) {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className=" flex items-center justify-center space-x-3 ">
        {/* <FaHamburger className=" text-5xl text-orange-500" /> */}
        <h2 className=" italic  font-extrabold  text-5xl my-5 text-teal-500 font-sans">
          crave.
        </h2>
      </div>
      <BarLoader color={"#f97316"} loading={loading} height={8} width={200} />
    </div>
  );
}

export default Spinner;
