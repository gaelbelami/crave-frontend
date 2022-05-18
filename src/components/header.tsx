import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiChatAlt2, HiSearch } from "react-icons/hi";
import { FaHamburger } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import AccountDropdown from "./accountDropdown";
import { UserRole } from "../generated/globalTypes";
import NotificationDropdown from "./notificationDropdown";
import { useSubscription } from "@apollo/client";
import { pendingOrdersSubscription } from "../generated/pendingOrdersSubscription";
import {
  PENDING_ORDERS_SUBSCRIPTION,
  WATCH_MESSAGES_SUBSCRIPTION,
} from "../graphql/query-mutation";
import { watchMessagesSubscription } from "../generated/watchMessagesSubscription";
import ToastAutoClose from "./toast";
import { ToastContainer } from "react-toastify";
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
  const [messages, setMessages] = useState(0);

  const { data: subscriptionData } = useSubscription<pendingOrdersSubscription>(
    PENDING_ORDERS_SUBSCRIPTION,
    {}
  );

  useEffect(() => {
    if (subscriptionData?.pendingOrders) {
      setNotification((notification) => (notification += 1));
    }
  }, [subscriptionData]);

  const [selected, setSelected] = useState(false);

  const { data: subscriptionMessages } =
    useSubscription<watchMessagesSubscription>(WATCH_MESSAGES_SUBSCRIPTION, {});

  const onClick = () => {
    setSelected(true);
    setMessages(0);
  };

  useEffect(() => {
    if (subscriptionMessages?.watchMessages) {
      setMessages((message) => (message += 1));
      if (
        subscriptionMessages.watchMessages.realTimeMessage.sender.id !==
        data?.me.id
      ) {
        ToastAutoClose({
          typeState: 3,
          message: "New Message",
          title: "Success",
        });
      }
    }
  }, [subscriptionMessages]);

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
            "flex items-center md:grid p-2 bg-white shadow-md  md:pl-10 md:pr-5 rounded-lg " +
            (data?.me.role === UserRole.client
              ? "grid-cols-3"
              : "grid grid-cols-2")
          }
        >
          {/* left */}
          <span className="my-auto  md:invisible visible">
            <Link className="text-teal-600" to="/">
              <FaHamburger className="w-5 h-5 my-3 mx-2" />
            </Link>
          </span>

          {/* Middle */}

          {data?.me.role === UserRole.client && (
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              className=" md:shadow-sm rounded-full flex items-center justify-around md:border-2  py-2"
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
          <div className=" flex  justify-end">
            <div className="flex  items-center my-auto ">
              <div className="relative">
                <Link onClick={onClick} to="/chats">
                  <HiChatAlt2 className=" hover:text-teal-600 md:h-7 md:w-7 h-6 w-6 text-gray-700 hover:cursor-pointer mx-3" />

                  {messages > 0 && (
                    <span className="md:-top-1.5 -top-1.5 right-2 absolute p-2 bg-teal-600  rounded-full shadow-lg">
                      <span className="absolute md:-top-0.5 md:-my-0.5 -top-1 py-0.5 -ml-1 text-xs text-gray-100 my-0.5">
                        {messages}
                      </span>
                    </span>
                  )}
                </Link>
              </div>
              <div className="relative">
                <NotificationDropdown
                  notification={notification}
                  subscriptionData={subscriptionData}
                />
                {notification > 0 && (
                  <span className="-top-0.5 left-3 absolute w-4 h-4 bg-teal-500  rounded-full">
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
            <div className="ml-2 inline-flex my-auto gap-2 items-center justify-center px-2">
              <AccountDropdown />
            </div>
          </div>

          {searchTerm && (
            <div className="flex flex-col col-span-3 mx-auto">
              <div className=""></div>
            </div>
          )}
        </div>
        <ToastContainer
          toastClassName={() =>
            "shadow-md text-gray-200 rounded-lg px-2 py-1 flex bg-slate-600 mx-5 mb-3"
          }
        />
      </header>
    </>
  );
};
