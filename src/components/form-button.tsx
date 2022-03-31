import React from "react";
interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const ButtonForm: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`mt-3 py-3 text-white text-lg font-semibold px-3 transition-colors focus:outline-none rounded-lg ${
      canClick
        ? "bg-teal-500 hover:bg-teal-600"
        : "bg-gray-300 pointer-events-none disabled"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
