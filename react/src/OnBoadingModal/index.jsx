import { Button, message, Modal, Progress } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import FirstScreen from "./Screen1";
import SecondScreen from "./Screen2";
import ThirdScreen from "./Screen3";
import FourthScreen from "./Screen4";
import FifthScreen from "./Screen5";
import RedirectScreen from "../components/GlobalCompoents/RedirectScreen";
import AnimationIcon from "./Anim.json";
import "./index.scss";
import axios from "axios";

export const OnBoadingModal = ({
  open,
  closeModal,
  auth,
  navigate,
  defaultScreen,
}) => {
  const [currentScreen, setCurrentScreen] = useState(defaultScreen);
  const [loading, setLoading] = useState(false);

  const [thirdScreenAnswer, setThirdScreenAnswer] = useState([]);
  const [fourthScreenAnswer, setFourthScreenAnswer] = useState("");
  const [fifthScreenAnswer, setFifthScreenAnswer] = useState("");

  const [redirectToHome, setRedirectToHome] = useState(false);

  let processPER = 50;

  if (currentScreen == "1") {
    processPER = 60;
  }

  if (currentScreen == "2") {
    processPER = 75;
  }
  if (currentScreen == "3") {
    processPER = 80;
  }
  if (currentScreen == "4") {
    processPER = 90;
  }
  if (currentScreen == "5") {
    processPER = 100;
  }
  // const handleOnboading = () => {
  //   setLoading(true);
  //   let data = {
  //     how_would_you_indentify_yourself: questions.identity,
  //     what_are_you_most_interested_in: questions.goal,
  //     revenue: questions.bussiness,
  //   };

  //   axios({
  //     url: import.meta.env.VITE_REACT_API_URL + "/login/save_quetionaire_popup",
  //     method: "post",
  //     data: {
  //       ...data,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.data.success) {
  //         // message.success(res.data.msg);

  //         setSubmit(true);

  //         // closeModal();
  //       } else {
  //         message.error(res.data.msg);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       message.error(err.message);
  //       setLoading(false);
  //     });
  // };

  if (redirectToHome) {
    return (
      <Modal
        open={open}
        title={null}
        footer={null}
        closable={false}
        className="onBoarding-modal"
      >
        <RedirectScreen iconJson={AnimationIcon} />
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      closable={false}
      className="onBoarding-modal"
    >
      {currentScreen === "1" && (
        <FirstScreen
          auth={auth}
          selectedAnswer={thirdScreenAnswer}
          setSelectedAnswer={setThirdScreenAnswer}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "2" && (
        <SecondScreen
          auth={auth}
          selectedAnswer={thirdScreenAnswer}
          setSelectedAnswer={setThirdScreenAnswer}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "3" && (
        <ThirdScreen
          auth={auth}
          selectedAnswer={thirdScreenAnswer}
          setSelectedAnswer={setThirdScreenAnswer}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "4" && (
        <FourthScreen
          auth={auth}
          setSelectedAnswer={setFourthScreenAnswer}
          selectedAnswer={fourthScreenAnswer}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "5" && (
        <FifthScreen
          auth={auth}
          setSelectedAnswer={setFifthScreenAnswer}
          selectedAnswer={fifthScreenAnswer}
          setRedirectToHome={setRedirectToHome}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      <Progress
        lineBorderRadius={0}
        size={"small"}
        percent={processPER}
        trailColor="#DCEFDF"
        strokeColor="#45EA1E"
        showInfo={false}
      />
    </Modal>
  );
};
