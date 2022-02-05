import React from "react";
import { HiAcademicCap, HiLockClosed, HiLightBulb } from "react-icons/hi";
import { FaBeer } from 'react-icons/fa';
export const Tabs = () => {
    const color = "purple"
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
        <div className="w-full max-w-screen-md flex flex-col items-center">
          <ul
            className="flex  mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px  mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                    "text-md font-semibold font-sans px-6 py-3 shadow-md rounded block leading-normal " +
                    (openTab === 1
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i><HiAcademicCap /></i>
                Profile
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                    "text-md font-semibold font-sans px-10 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="text-base mr-1"><HiLightBulb /></i>
                 Security
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                    "text-md font-semibold font-sans px-6 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i><HiLockClosed /></i>
                 Options
              </a>
            </li>
            
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
