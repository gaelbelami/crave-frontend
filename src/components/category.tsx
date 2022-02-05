import { restaurantsPageQuery_allCategories_categories } from "../__generated__/restaurantsPageQuery";

interface ICategory {
    id: number,
    coverImage: string,
    name: string,
}

export const Category = (category: ICategory) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      {/* // <div key={category.id} className=" w-16 h-16 bg-red-800 rounded-full" style={{ backgroundImage: `url(${category.coverImage})`}}></div> */}
      <img
        className="w-16 h-16 bg-cover group-hover:bg-purple-100  group-hover:scale-125 rounded-full transition-all duration-200 ease-linear hover:rotate-6"
        key={category.id}
        src={`${category.coverImage}`}
        alt="category"
        />
      <span className="mt-1 text-sm text-center font-bold">
        {category.name}
      </span>
    </div>
  );
};
