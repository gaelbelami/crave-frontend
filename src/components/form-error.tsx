import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}
export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className=" font-medium text-sm text-red-500">{errorMessage}</span>
);
