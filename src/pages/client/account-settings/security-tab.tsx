import React from "react";
import { ButtonForm } from "../../../components/form-button";

export const SecurityTab = () => {
  return (
    <div>
      <div>
        <div className="border-b border-gray-300">
          <h2 className=" font-semibold text-xl mb-5 ">Change Password</h2>
        </div>

        <div className="grid gap-3 pt-3">
          <input
            type="password"
            className="input"
            placeholder="Current password"
          />
          <input type="password" className="input" placeholder="New password" />
          <input
            type="password"
            className="input"
            placeholder="Retype new password"
          />
        </div>
        <div className=" space-x-2">
          <ButtonForm
            actionText="save changes"
            canClick={true}
            loading={false}
          />
          <button className=" py-3 px-3 text-lg font-semibold bg-gray-200 rounded-lg">
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
