import { Button, Progress } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import LeftToRightAnimation from "../../HOC/LeftToRightAnimation";
import { showNewMessage } from "@intercom/messenger-js-sdk";
import { HalfCircle } from "../Icons";
import "./index.scss";
export const HeadingBar = () => {
  const auth = useSelector((state) => state.auth.auth);

  let per = 0;
  let activeStore = false;
  let sellproduct = auth.steps.PRODUCT_CHOOSE;
  let kycComplete = auth.steps.KYC;

  let stores = Object.keys(auth?.user?.user_stores);

  stores.forEach((id) => {
    if (auth?.user?.user_stores[id].store_connected) {
      activeStore = true;
    }
  });
  if (activeStore) {
    per += 33;
  }
  if (sellproduct) {
    per += 33;
  }
  if (kycComplete) {
    per += 33;
  }

  if (activeStore && sellproduct && kycComplete) {
    per = 100;
  }

  return (
    <div className="snapshot-page-heading-container">
      <div className="top-bar-container">
        <div className="right">
          <HalfCircle />
        </div>
        <div className="left">
          <div className="heading">
            Your Progress <span className="sp">({per}% Setup Complete)</span>
          </div>
          <Progress
            percent={per}
            size="small"
            rootClassName="progressContainer"
          />
        </div>
      </div>
      <div className="blog-container">
        <div className="heading">
          {auth?.user?.user_fname}, let’s get you started.
        </div>
        <div className="info">
          Get the most out of vFulfill by following the steps below.
        </div>
        <div className="info">
          And in case you need any help, we’re right there, just ping us{" "}
          <Button
            type="link"
            className="here-btn"
            onClick={() => {
              showNewMessage("Connect me with a Growth Expert");
            }}
          >
            here
          </Button>
          .
        </div>
      </div>
    </div>
  );
};
