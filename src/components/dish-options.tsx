import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  dishId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <div onClick={onClick} className="mt-2 ">
      <span
        key={name}
        className={`border rounded-2xl cursor-pointer text-gray-500 text-sm font-semibold px-2 py-1 ${
          isSelected
            ? "border-gray-800 text-gray-800"
            : "hover:border-gray-800 hover:text-gray-800"
        }`}
      >
        {name} ${extra}
      </span>
    </div>
  );
};
