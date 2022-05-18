import React from "react";
import { Helmet } from "react-helmet-async";
import { BsImageFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";

export const EditProfile: React.FC = () => {
  const { data: userData } = useMe();

  return (
    <div className="page-container min-h-screen mb-20">
      <div className="flex flex-col mt-10 items-center ">
        
          <title>Profile Details | Crave ~ Food</title>
        
        <div className=" inline-flex items-center mb-2">
          <div className=" text-xl font-bold md:font-extrabold text-gray-600 md:text-2xl mb-2">
            My Account
          </div>
        </div>

        <div className="grid max-w-screen-sm  mt-5 w-full ring-1 ring-gray-300 shadow-md p-5 rounded-lg ">
          <Link to="/account-settings">
            <div className="grid justify-items-end items-center text-teal-600 text-sm font-semibold">
              <div className=" inline-flex items-center border-2 border-teal-500 rounded-lg px-2 py-1">
                <RiEdit2Fill className="mr-2" />
                Edit Profile
              </div>
            </div>
          </Link>
          <span className="inline-flex items-center mb-4">
            {!userData?.me.avatar ? (
              <div className="w-28 h-28 rounded-lg shadow-md bg-gray-200 bg-center object-cover mr-2">
                <BsImageFill className=" h-16 w-auto mx-auto my-auto mt-5  object-cover object-center text-gray-500 animate-pulse" />
              </div>
            ) : (
              <img
                className="w-28 h-28 rounded-lg shadow-md bg-center object-cover mr-2"
                src={userData?.me.avatar}
                alt="profile"
                width="384"
                height="512"
              />
            )}
          </span>

          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            First Name
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {userData?.me.firstName}
          </div>

          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Last Name
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {userData?.me.lastName}
          </div>
          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Username
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {userData?.me.username}
          </div>
          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Email
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {userData?.me.email}
          </div>
          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Phone Number
          </span>
          {!userData?.me.phoneNumber ? (
            <div className=" font-semibold text-gray-400 ring-1 ring-gray-200 py-3 px-5 rounded-lg">
              xxxx-xxxx-xxxxx
            </div>
          ) : (
            <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
              {userData?.me.phoneNumber}
            </div>
          )}

          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Address
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {userData?.me.address}
          </div>
          <span className=" mt-5 mb-1 font-semibold text-sm text-gray-700">
            Birthdate
          </span>
          <div className=" ring-1 ring-gray-200 py-3 px-5 rounded-lg text-black">
            {new Date(userData?.me.birthdate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
