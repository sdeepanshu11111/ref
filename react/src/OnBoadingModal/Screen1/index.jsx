import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";

import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from "./icons";

import "./index.scss";

const pointers = [
  {
    label: "Inner Circle Products",
    icon: <Icon1 />,
  },
  {
    label: "Automating eCom Operations",
    icon: <Icon2 />,
  },
  {
    label: "High Delivery Rates",
    icon: <Icon3 />,
  },
  {
    label: "Sourcing Any Product Across the Globe",
    icon: <Icon4 />,
  },
  {
    label: "Faster COD Payouts Globally",
    icon: <Icon5 />,
  },
  {
    label: "100% Transparent Accounting",
    icon: <Icon6 />,
  },
];

const FirstScreen = (props) => {
  const userFirstName = props?.auth?.auth?.user?.user_firstname.split(" ")[0];

  return (
    <div id="fade-in" className="onboarding-screen1">
      <div className="main-header">
        <h1>👋 Hi {userFirstName}, welcome to vFulfill</h1>
        <h2>Launch and Grow Your eCommerce </h2>
        <h3>Business in India, Hassle Free.</h3>
      </div>

      <div className="screen1-heading">
        🎊 <span>1,500+</span> eCom entreprenuers recommend vFulfill for:
      </div>

      <div className="pointer-wrapper">
        {pointers.map((pointer, index) => (
          <motion.div
            key={index}
            className="pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {pointer.icon}

            {pointer.label}
          </motion.div>
        ))}
      </div>

      <div className="button-wrapper">
        <Button
          id="fade-in"
          type="primary"
          className="continue-btn"
          onClick={() => {
            props.setCurrentScreen("2");
          }}
        >
          I am excited, Let’s begin
        </Button>
      </div>
    </div>
  );
};

export default FirstScreen;
