import React from "react";
import { ButtonForm } from "../../../components/form-button";

export const Emailtab = () => {
  return (
    <div>
      <div>
        <div className="border-b border-gray-300">
          <h2 className=" font-extrabold text-lg mb-5 text-gray-700">
            Change Email Address
          </h2>
        </div>

        <div
          className="mt-2 p-4 mb-4 text-sm text-gray-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-gray-800"
          role="alert"
        >
          In order to change your email address, we will first send you a link
          to your email box
          <span className="font-medium"> ishimwegaelbelami@gmail.com. </span> By
          clicking on the link, you will be redirected to another page where you
          will enter your new email address.
        </div>
        <div className="grid gap-3 pt-3">
          <input type="password" className="input" placeholder="Email" />
        </div>
        <div className=" space-x-2">
          <ButtonForm
            actionText="Request a link to change my email address"
            canClick={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};
