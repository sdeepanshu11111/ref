import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";

import "./index.scss";

const SecondScreen = (props) => {
  const userFirstName = props?.auth?.auth?.user?.user_firstname.split(" ")[0];

  return (
    <div id="fade-in" className="onboarding-screen2">
      <div className="main-header">
        <h1>
          Let’s Get Going, <span>{userFirstName}</span>{" "}
        </h1>
      </div>

      <div className="padding-div">
        <h2>Help us Find Winning Products for You</h2>

        <h3>
          Please answer a few questions to help us find winning products,
          especially curated for you.
        </h3>

        <div className="button-wrapper">
          <Button
            id="fade-in"
            type="primary"
            className="continue-btn"
            onClick={() => {
              props.setCurrentScreen("3");
            }}
          >
            Let’s Get Started
          </Button>

          <a href="#">I want to launch my existing product in India</a>
        </div>
      </div>
    </div>
  );
};

export default SecondScreen;
