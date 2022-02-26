import React from "react";
import { HiUser } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Emailtab } from "./email-tab";
import { GeneralTab } from "./general-tab";
import { SecurityTab } from "./security-tab";

export const AccountSettings = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-20">
        <div className="w-full max-w-screen-md flex flex-col items-center">
          <ul className=" flex gap-2" role="tablist">
            <li className=" mb-5 last:mr-0 inline-flex text-center justify-center items-center">
              <a
                className={
                  "text-md px-4 py-2 font-semibold rounded-lg inline-flex items-center justify-center" +
                  (openTab === 1 ? " text-white bg-orange-500  shadow-md" : "")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <HiUser className="mr-1" />
                Account
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md px-4 py-2 font-semibold rounded-lg inline-flex items-center justify-center" +
                  (openTab === 2 ? " text-white bg-orange-500  shadow-md" : "")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <IoLockClosed className="mr-1" />
                Security
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md px-4 py-2 font-semibold rounded-lg inline-flex items-center justify-center" +
                  (openTab === 3 ? " text-white bg-orange-500  shadow-md" : "")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <MdEmail className="mr-1" />
                Email
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ring-1 ring-gray-300 shadow-md p-5 rounded-lg">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <GeneralTab />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <SecurityTab />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Emailtab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
