import React from "react";

function Banner() {
  return (
    <div>
      <div className="relative mt-8 rounded-lg shadow-md  mb-5">
        <div
          className=" p-24 md:p-44 lg:p-52 xl:p-72 rounded-lg bg-cover mb-2 bg-center"
          style={{
            backgroundImage: `url(https://smt.gt/wp-content/uploads/2018/01/Banner1-V2-1.jpg)`,
          }}
        />
      </div>
    </div>
  );
}

export default Banner;
