import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { FaHamburger } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { watchMessagesSubscription } from "../generated/watchMessagesSubscription";
import { WATCH_MESSAGES_SUBSCRIPTION } from "../graphql/query-mutation";
import { useSubscription } from "@apollo/client";
import { HiChatAlt2 } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { RiShoppingCart2Fill } from "react-icons/ri";

interface ISidebar {
  countMessage: number;
}
const Sidebar = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [selected, setSelected] = useState(false);

  const [notification, setNotification] = useState(0);

  const { data: subscriptionData } = useSubscription<watchMessagesSubscription>(
    WATCH_MESSAGES_SUBSCRIPTION,
    {}
  );

  const onClick = () => {
    setSelected(true);
    setNotification(0);
  };

  useEffect(() => {
    if (subscriptionData?.watchMessages) {
      setNotification((notification) => (notification += 1));
    }
  }, [subscriptionData]);

  return (
    <div
      // onMouseEnter={() => setIsShowing(true)}
      // onMouseLeave={() => setIsShowing(false)}
      className="h-screen sticky mx-auto top-0 z-30 rounded-lg py-3 md:pl-3  hidden md:block"
    >
      <Transition
        show={isShowing}
        enter="transition-all transform duration-300 ease-in-out"
        enterFrom="-translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-all transform duration-300 ease-in-out"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-full opacity-0"
        className="md:w-56"
        aria-label="Sidebar"
      >
        <div className="md:px-3 py-4 overflow-y-auto rounded h-screen bg-white">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="md:flex flex-row items-center h-12 transform  transition-transform ease-in duration-200  hover:text-teal-800  p-2 text-gray-900 rounded-lg dark:text-teal-600"
              >
                <span className="md:flex md:ml-1 italic font-extrabold md:text-4xl">
                  cr
                  <FaHamburger className="md:w-5 h-5 mt-4 mx-0.5" />
                  ve
                </span>
              </Link>
            </li>
            {linksArray.map(({ label, icon, to }) => (
              <li key={label}>
                <Link
                  onClick={onClick}
                  to={to}
                  className="md:flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-300  hover:text-white  p-2 text-base font-normal text-gray-900 rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-teal-700"
                >
                  {icon}
                  <span className="flex-1 md:ml-3 whitespace-nowrap font-semibold">
                    {label}
                  </span>
                  {notification !== 0 && label === "Chat" && (
                    <span className="md:inline-flex items-center justify-center md:w-3 h-3 md:p-3 md:ml-3 md:text-sm font-medium text-yellow-600 bg-blue-200 rounded-full dark:bg-teal-800 dark:text-yellow-200">
                      {notification}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

const linksArray = [
  // {
  //   label: "Order",
  //   icon: (
  //     <MdDeliveryDining className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
  //   ),
  //   to: "/order",
  //   // notification: 0,
  // },
  // {
  //   label: "Favorites",
  //   icon: (
  //     <MdOutlineFavorite className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
  //   ),

  //   to: "/favorites",
  //   // notification: 0,
  // },

  // {
  //   label: "History",
  //   icon: (
  //     <svg
  //       className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
  //         clipRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  //   to: "/history",
  //   // notification: 0,
  // },
  {
    label: "Chat",
    icon: (
      <HiChatAlt2 className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
    ),

    to: "/chats",
    // notification: 7,
  },
  {
    label: "Orders",
    icon: (
      <RiShoppingCart2Fill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
    ),

    to: "/orders",
    // notification: 7,
  },
];

export default Sidebar;
