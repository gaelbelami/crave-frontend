import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiSearch } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import AccountDropdown from "./accountDropdown";
import { UserRole } from "../__generated__/globalTypes";
import NotificationDropdown from "./notificationDropdown";
import { useSubscription } from "@apollo/client";
import { pendingOrdersSubscription } from "../__generated__/pendingOrdersSubscription";
import { PENDING_ORDERS_SUBSCRIPTION } from "../graphql/query-mutation";
// import logo from "../images/logo.svg";

interface ISearchFormProps {
  searchTerm: string;
}

export const Header: React.FC = () => {
  const { data } = useMe();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<ISearchFormProps>();
  const history = useNavigate();
  const { searchTerm } = watch();
  const onSearchSubmit = () => {
    history(
      {
        pathname: "/search",
        search: `?term=${searchTerm}`,
      },
      { replace: true }
    );
  };
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ searchTerm: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const [notification, setNotification] = useState(0);

  const { data: subscriptionData } = useSubscription<pendingOrdersSubscription>(
    PENDING_ORDERS_SUBSCRIPTION,
    {}
  );

  useEffect(() => {
    if (subscriptionData?.pendingOrders) {
      setNotification((notification) => (notification += 1));
    }
  }, [subscriptionData]);
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-teal-600 p-2 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" sticky top-0 z-30 bg-gray-100 rounded-b-lg pt-3 ">
        <div
          className={
            " grid  p-2 bg-white shadow-md  md:pl-10 md:pr-5 rounded-lg " +
            (data?.me.role === UserRole.client ? "grid-cols-3" : "grid-cols-2")
          }
        >
          {/* left */}
          <div className="relative h-10 cursor-pointer my-auto">
            <Link className="inline-flex text-center items-center gap-1" to="/">
              {/* <img src={logo} alt="crave" className=" w-28" /> */}
              {/* <SiSnapcraft className=" text-3xl text-orange-500 mt-1" /> */}
              {/* <h2 className=" italic font-black my-auto text-4xl text-orange-500 font-sans">
              crave.
            </h2> */}
            </Link>
          </div>

          {/* Middle */}

          {data?.me.role === UserRole.client && (
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              className=" md:shadow-sm rounded-full flex items-center md:border-2  py-2"
            >
              <input
                {...register("searchTerm", {
                  required: "Min 3 characters for the search term",
                  minLength: 3,
                })}
                autoComplete="off"
                className=" text-gray-600 transform opacity-70 focus-visible:opacity-100 hover:opacity-100 focus:translate-x-2 transition-transform ease-in duration-200 placeholder:font-semilight placeholder-gray-400 flex-grow focus:placeholder:pl-1 pl-5 bg-transparent outline-none"
                type="search"
                placeholder="Search restaurant..."
              />
              <HiSearch
                onClick={handleSubmit(onSearchSubmit)}
                className=" animate-pulse md:mx-2 h-8 w-8 bg-teal-700 hidden md:inline-flex text-white rounded-full p-2 cursor-pointer  hover:shadow-2xl active:scale-90 transition duration-150"
              />
            </form>
          )}

          {/* Right */}
          <div className=" flex  items-center justify-end">
            <div className="flex">
              <Link to="/cart">
                <FaShoppingCart className=" md:h-6 md:w-6 h-4 w-4 text-gray-700 hover:cursor-pointer mx-3" />
              </Link>
              <div className="relative">
                <NotificationDropdown
                  notification={notification}
                  subscriptionData={subscriptionData}
                />
                {notification > 0 && (
                  <span className="-top-2 left-3 absolute w-4 h-4 bg-teal-500  rounded-full">
                    <span className="absolute -top-0.5 left-1 text-sm font-semibold text-gray-100">
                      {notification}
                    </span>
                  </span>
                )}
              </div>
              {/* <div className="relative">
                <div className=" absolute bg-green-300 rounded-full top-0 right-0">
                  1
                </div>
                <NotificationDropdown />
              </div> */}
            </div>
            <div className="ml-2 inline-flex gap-2 items-center justify-center px-2">
              <AccountDropdown />
            </div>
          </div>

          {searchTerm && (
            <div className="flex flex-col col-span-3 mx-auto">
              <div className=""></div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
