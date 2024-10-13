import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "antd";
import { VfulfillBlackLogo } from "../../../assets/vFulfillBlackLogo";
import "./index.scss";
const WelcomeScreen = () => {
  const videoRef = React.createRef();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="welcome-screen">
      <div className="top-logo">
        <VfulfillBlackLogo />
      </div>

      <h2>👋 Hi Rishabh, welcome aboard.</h2>
      <h3>
        Watch the video below to learn how vFulfill helps{" "}
        <span>Dropshippers</span> build a profitable, sustainable eCommerce
        business in India.
      </h3>

      <div onClick={toggleVideoPlayback} className="video-tag-wraper">
        {!isPlaying && (
          <div className="overlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 64 64"
            >
              <path
                id="Exclusion_4"
                data-name="Exclusion 4"
                d="M-9184,3903a31.791,31.791,0,0,1-12.455-2.515,31.89,31.89,0,0,1-10.173-6.858,31.911,31.911,0,0,1-6.858-10.172A31.79,31.79,0,0,1-9216,3871a31.787,31.787,0,0,1,2.515-12.456,31.908,31.908,0,0,1,6.858-10.171,31.9,31.9,0,0,1,10.173-6.857A31.787,31.787,0,0,1-9184,3839a31.783,31.783,0,0,1,12.454,2.515,31.9,31.9,0,0,1,10.172,6.857,31.908,31.908,0,0,1,6.858,10.171A31.787,31.787,0,0,1-9152,3871a31.79,31.79,0,0,1-2.515,12.456,31.911,31.911,0,0,1-6.858,10.172,31.891,31.891,0,0,1-10.172,6.858A31.79,31.79,0,0,1-9184,3903Zm-9.5-44.5v25l24-12.5-24-12.5Z"
                transform="translate(9216 -3839)"
                fill="#fafafa"
                opacity="0.837"
              />
            </svg>
          </div>
        )}
        <video
          ref={videoRef}
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
        ></video>
      </div>
      <Button onClick={() => navigate("/plans")}>Choose Plan</Button>
    </div>
  );
};

export default WelcomeScreen;
