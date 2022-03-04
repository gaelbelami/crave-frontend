import React from "react";
import { BsImageFill } from "react-icons/bs";

export const BannerSkeleton = () => {
  return (
    <div>
      <div className="relative mt-8 rounded-lg shadow-md  mb-5">
        <div className=" p-12 md:p-24 lg:p-32 xl:p-52 rounded-lg bg-cover mb-2 bg-center bg-gray-200">
          <BsImageFill className=" h-32 w-auto mx-auto my-auto mt-5  object-cover object-center text-gray-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
