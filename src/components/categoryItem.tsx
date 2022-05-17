import { Link } from "react-router-dom";
import { ICategory } from "../interfaces/category.interface";

export const CategoryItem: React.FC<ICategory> = (category) => {
  return (
    <div className="flex-none py-6 px-3 first:pl-6 last:pr-6 group">
      {/* // <div key={category.id} className=" w-16 h-16 bg-red-800 rounded-full" style={{ backgroundImage: `url(${category.coverImage})`}}></div> */}
      <Link to={`/category/${category.slug}`} state={category}>
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            className="w-10 h-10 md:w-16 md:h-16 group-hover:bg-gray-100  group-hover:scale-125 rounded-full transition-all duration-200 ease-linear hover:rotate-6"
            key={category.id}
            src={`${category.coverImage}`}
            alt="category"
          />
        </div>
        <strong className=" text-slate-900 text-xs font-sans font-medium md:font-bold dark:text-slate-600">
          {category.name}
        </strong>
      </Link>
    </div>
  );
};
