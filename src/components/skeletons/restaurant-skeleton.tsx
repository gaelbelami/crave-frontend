import { BsImageFill } from "react-icons/bs";

export const RestaurantSkeleton = () => {
  // card
  const items = [];

  for (let i = 0; i <= 8; i++) {
    items.push(
      <div
        key={i}
        className="flex flex-col animate-pulse shadow-md bg-white pb-1"
      >
        <div className=" animate-pulse bg-gray-200 py-28 bg-cover mb-2 bg-center rounded-lg ">
          <BsImageFill className=" h-16 w-auto mx-auto my-auto mt-5  object-cover object-center text-gray-500 animate-pulse" />
        </div>

        <div className=" flex mb-2 ml-2">
          <div className="animate-pulse p-3 bg-gray-200 rounded"></div>
          <div className="animate-pulse py-3 px-16 bg-gray-200 ml-2 rounded"></div>
        </div>
        <div className="border-t border-gray-300 flex justify-between">
          <div className=" text-gray-500 inline-flex items-center  p-1 mt-2 text-xs font-semibold">
            {/* <div className=" animate-pulse p-2 bg-gray-200 rounded"></div> */}
            <div className="animate-pulse py-2 px-14 bg-gray-200 ml-2 rounded"></div>
          </div>
          <div className=" text-gray-500 inline-flex items-center  p-1 mt-2 text-xs font-semibold">
            {/* <div className="animate-pulse p-2 bg-gray-200 rounded"></div> */}
            <div className="animate-pulse py-2 px-14 bg-gray-200 ml-2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="grid md:grid-cols-3 gap-x-5 gap-y-12">{items}</div>;
};
