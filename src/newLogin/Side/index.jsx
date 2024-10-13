import React, { cloneElement } from "react";
import VflogoFullWhite from "../../assets/Icons/VflogoFullWhite";
import { Button, Steps } from "antd";
import { items, itemsContacts } from "./constants";
import WelcomeScreen from "./WelcomeScreen/index";
import RightBanner from "../SignupForm/RightBanner";
import Review from "./Review";

import "./index.scss";
// import { Avatar } from "components/ui";

// import { APP_NAME } from "constants/app.constant";

const Side = ({ children, content, ...rest }) => {
  return (
    <div className="grid lg:grid-cols-[540px_1fr_1fr] h-[100vh] side-container">
      <div
        className={`bg-no-repeat bg-[#514DE2] bg-cover  px-14 flex-col py-14 justify-between gap-14 hidden lg:flex`}
        style={{
          backgroundImage: "url('/img/bg.png')",
        }}
      >
        <VflogoFullWhite />

        {rest.active == 1 ? <RightBanner /> : <Review />}

        <span className="text-white text-sm font-medium   ">
          Copyright &copy; {`${new Date().getFullYear()},`} {`vFulfill Inc.`}{" "}
        </span>
      </div>
      <div className="bg-[#EBEBEB] py-6  col-span-2 flex flex-col justify-center items-center lg:bg-white lg:py-0">
        <div className="xl:min-w-[440px] login-content-wraper">
          <div className="mb-4">{content}</div>

          <div className="p-5 rounded-lg shadow-md bg-white lg:p-0 lg:rounded-0 lg:shadow-none">
            {children ? cloneElement(children, { ...rest }) : null}
          </div>
        </div>

        <span className="text-[#848484] text-xs mt-8 lg:hidden">
          Copyright &copy; {`${new Date().getFullYear()},`} {`vFulfill Inc.`}{" "}
        </span>
      </div>
    </div>
  );
};

export default Side;
