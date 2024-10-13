import React from "react";
import { useEffect, useState } from "react";

import { Actions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from "../assets/Icons/VflogoFull";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import qs from "qs";

import "./index.scss";
const Subscription = ({
  activeTab,
  auth,
  location,
  hash,
  navigate,
  match,
  title,
}) => {
  const param = qs.parse(window.location.search.replace(/\?/, ""));

  useEffect(() => {
    document.title = title;

    if (!auth?.auth?.logged_in) {
      return navigate("/switch-store");
    }
  }, [auth]);

  return (
    <div id="fade-in" className="subscription-container">
      <LeftSection />
      <div className="subscription-right-screen">
        <RightSection
          trial={param?.trial}
          plan_id={param?.plan_id}
          monthly={param?.monthly}
          yearly={param?.yearly}
          quarterly={param?.quarterly}
          plan_name={param?.plan_name}
          changeplan={param?.changeplan}
          amount={param?.amount}
        />
      </div>
    </div>
  );
};
export default Subscription;
