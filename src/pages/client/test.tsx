import React, { Fragment } from "react";
import {
  toast,
  ToastContainer,
  Zoom,
  Bounce,
  Slide,
  TypeOptions,
  ToastClassName,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

// import "sweetalert2/src/sweetalert2.scss";
interface IContextClass {
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  default?: string;
  dark?: string;
}

const contextClass: { [key: string]: any } = {
  success: "bg-gray-700",
  error: "bg-gray-700",
  info: "bg-gray-700",
  warning: "bg-gray-700",
  default: "bg-gray-700",
  dark: "bg-white-600 font-gray-300",
};

const ToastContent = () => (
  <Fragment>
    <div className=" m-1">
    <div>
      <div className="">
        <h6 className=" font-semibold font-sans">Bienvenue, gael</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span className=" text-xs font-sans">
        Nous sommes heureux de vous revoir sur Koksie. Profitez bien de tous nos
        services 😊
      </span>
    </div>
  </div>
  </Fragment>
);

export const Test: React.FC = () => {
  const notify = () => (
    toast.error(<ToastContent />, {
      transition: Bounce,
      hideProgressBar: true,
      autoClose: 3000,
    }),
    Swal.fire("The Internet?", "That thing is still around?", "question")
  );
  return (
    <div>
      <button onClick={notify}>Notify !</button>
      <ToastContainer
        toastClassName={({ type }: any) =>
          contextClass[type || "sucess"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
      />
    </div>
  );
};
