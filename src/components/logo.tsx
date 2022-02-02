import React from "react";

interface ILogo {
  className?: string
}

export const Logo = (className: string) => {
  return (
    <div>
      {/* <img src={logo} alt="" className=" w-52 mb-10"/> */}
      <h2 className={className}>
        crave
      </h2>
    </div>
  );
};
