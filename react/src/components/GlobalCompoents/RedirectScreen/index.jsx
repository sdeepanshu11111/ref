import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import RedirectIcon from "./redirectIcon.svg";
import "./index.scss";

const RedirectScreen = ({ path = "/switch-store", iconJson }) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate(path); // Replace "/target-path" with the actual path you want to redirect to
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    }; // Cleanup the intervals and timeout if the component unmounts
  }, [navigate]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: iconJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div id="fade-in" className="redirect-screen">
      <h1>Almost here…</h1>
      <h2>
        We are working to personalise the platform & your experience in vFulfill
        with you…
      </h2>
      <div className="payment-icon">
        <Lottie
          options={defaultOptions}
          isStopped={false}
          height={40}
          width={40}
        />
      </div>

      <div className="bar">
        <div className="fill"></div>
      </div>
      <h4>
        This page will refresh in <span> {seconds} </span>seconds
      </h4>
    </div>
  );
};

export default RedirectScreen;
