import React, { useEffect, useState } from "react";
import { Modal, Skeleton, Tabs, message } from "antd";
import axios from "axios";
import Lottie from "react-lottie";
import PaymentSuccessAnim from "./paymentSuccess.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../store";
// import { Redirect } from "react-router-dom";
import "./index.scss";

const AppSubscriptionComplete = (props) => {
  const [iconStop, setIconStop] = useState(false);
  const [countdownTime, setCountdownTime] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { switchStore } = bindActionCreators(Actions, dispatch);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownTime === 0) {
        clearInterval(interval);
      } else {
        setCountdownTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PaymentSuccessAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    switchStore();

    if (countdownTime === 0) {
      return navigate("/switch-store");
    }
  }, [countdownTime]);

  // useEffect(() => {
  //   switchStore();
  // }, []);

  return (
    <div id="fade-in" className="transaction-complete-wraper">
      <div className="payment-icon">
        <Lottie
          options={defaultOptions}
          isStopped={iconStop}
          height={40}
          width={40}
        />
      </div>
      <h1>{!!props.custom ? props.text : "Payment Successfull"} </h1>

      <div className="bar">
        <div className="fill"></div>
      </div>
      <h2>Redirecting to Home in {countdownTime} seconds</h2>
    </div>
  );
};

export default AppSubscriptionComplete;
