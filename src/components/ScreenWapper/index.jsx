import React from "react";
import "./index.scss";
import Vficon from "../../assets/Icons/Vficon";
import { Button, Steps } from "antd";
import { items, itemsContacts } from "./constants";
import WelcomeScreen from "./WelcomeScreen/index";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../store";

const ScreenWapper = ({ active = 0, type = "", children }) => {
  const dispatch = useDispatch();
  const { signOut, loadingTrue } = bindActionCreators(Actions, dispatch);

  return (
    <div className="screenWapper-container">
      <div className="stage-container">
        <div className="steps-container">
          <Steps
            direction="vertical"
            current={active}
            items={type === "contact-details" ? itemsContacts : items}
          />
        </div>
        {/* <div className="vf-icon-container">
          <Vficon />
        </div> */}
      </div>
      <div className="main-container">
        {active === 4 ? <WelcomeScreen /> : children}
      </div>
      <div className="save-logout" onClick={() => signOut()}>
        Signout
      </div>
    </div>
  );
};

export default ScreenWapper;
