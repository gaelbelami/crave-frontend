import { Link } from "react-router-dom";
import { ICategory } from "../interfaces/category.interface";

export const CategoryItem: React.FC<ICategory> = (category) => {
  return (
    <div className="relative items-center justify-center group cursor-pointer mt-5 mb-2">
      {/* // <div key={category.id} className=" w-16 h-16 bg-red-800 rounded-full" style={{ backgroundImage: `url(${category.coverImage})`}}></div> */}
      <Link to={`/category/${category.slug}`} state={category}>
        <div className=" w-10 h-10 md:w-16 md:h-16  ">
          <img
            className="bg-cover group-hover:bg-gray-100  group-hover:scale-125 rounded-full transition-all duration-200 ease-linear hover:rotate-6"
            key={category.id}
            src={`${category.coverImage}`}
            alt="category"
          />
        </div>
        <span className="mt-1 text-xs inline-flex items-center justify-center text-center font-semibold">
          {category.name}
        </span>
      </Link>
    </div>
  );
};
