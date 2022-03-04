export const CategorySkeleton = () => {
  return (
    <div className="flex space-x-6 mt-3 py-3">
      <div className="">
        <div className="bg-gray-200 animate-pulse w-10 h-10 md:w-16 md:h-16 rounded-full mb-2"></div>
        <div className="px-4 py-2 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="">
        <div className="bg-gray-200 animate-pulse w-10 h-10 md:w-16 md:h-16 rounded-full mb-2"></div>
        <div className="px-4 py-2 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="">
        <div className="bg-gray-200 animate-pulse w-10 h-10 md:w-16 md:h-16 rounded-full mb-2"></div>
        <div className="px-4 py-2 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};
