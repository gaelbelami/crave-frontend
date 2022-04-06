import React, { Fragment } from "react";
import { BsCheck2 } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Menu, Transition } from "@headlessui/react";
import { MdNotInterested } from "react-icons/md";
import { pendingOrdersSubscription } from "../__generated__/pendingOrdersSubscription";

interface INotification {
  notification: number;
  subscriptionData?: pendingOrdersSubscription;
}
const NotificationDropdown = ({
  notification,
  subscriptionData,
}: INotification) => {
  const { data } = useMe();
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="outline-none" type="button">
            <FaBell className=" md:h-6 md:w-6 h-4 w-4 text-gray-700 hover:cursor-pointer" />
          </Menu.Button>

          <Transition
            show={open}
            enter="transform transition duration-200 easy-in"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transform transition duration-75 ease-out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1 flex flex-col" role="none">
                <div
                  className="inline-grid grid-cols-2 items-center text-gray-700 border-b border-1 px-4 py-2 "
                  role="menuitem"
                >
                  <div className="font-bold ">Notifications</div>
                  {notification > 0 && (
                    <span className=" justify-self-end text-xs font-semibold bg-orange-300 bg-opacity-50 rounded-xl px-2">
                      {notification} new
                    </span>
                  )}
                </div>
                <Menu.Item>
                  {({ active }) =>
                    notification > 0 ? (
                      <Link
                        to={`/orders/${subscriptionData?.pendingOrders.id}`}
                        className={`inline-flex px-4 py-2 mt-1 text-sm text-gray-700
                  
                  ${active && "bg-gray-200"}
                  
                  `}
                        role="menuitem"
                      >
                        <div className=" mr-2 p-1 justify-center items-center inline-flex bg-green-200 rounded-full">
                          <BsCheck2 className="justify-start items-start md:h-4 md:w-4 h-4 w-4 text-green-500" />
                        </div>
                        Your have a new Order
                      </Link>
                    ) : (
                      <div
                        className={`inline-flex px-4 py-2 mt-1 text-sm text-gray-700
                  
                  
                  
                  `}
                        role="menuitem"
                      >
                        <div className=" mr-2 p-1 justify-center items-center inline-flex bg-green-200 rounded-full">
                          <MdNotInterested className="justify-start items-start md:h-4 md:w-4 h-4 w-4 text-green-500" />
                        </div>
                        You have no new notification
                      </div>
                    )
                  }
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};

export default NotificationDropdown;
