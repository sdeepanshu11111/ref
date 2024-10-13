// import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import getAnswer from "../API/getAnswer";
import { message, Radio, Progress, Skeleton, Spin } from "antd";
import { Actions } from "../../store";
import AnimationIcon from "./AnimationIcon.json";
import FirstScreen from "./FirstScreen";
import DropShipScreen from "./DropShipScreen";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import RedirectScreen from "../../components/GlobalCompoents/RedirectScreen";
import "./index.scss";

const QuestionScreen = (props) => {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [answer, setAnswer] = useState({});

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [redirectToHome, setRedirectToHome] = useState(false);

  const screenHandler = (onboardingAnswer) => {
    if (window.location.search.includes("back")) {
      setAnswer(onboardingAnswer);
    } else {
      if (!!onboardingAnswer?.what_are_you_most_interested_in?.length) {
        return navigate("/switch-store");
      }

      if (!!onboardingAnswer?.ecom_experience?.length) {
        return navigate("/question3");
      }

      if (!!onboardingAnswer?.how_would_you_indentify_yourself?.length) {
        if (
          onboardingAnswer?.how_would_you_indentify_yourself?.includes(
            "dropship"
          )
        ) {
          return navigate("/dropship-question");
        } else {
          return navigate("/question2");
        }
      }
    }
  };

  let processPER = 50;

  if (props?.screen == "question") {
    processPER = 80;
  }

  if (props?.screen == "question2" || props?.screen == "dropship-question") {
    processPER = 90;
  }

  if (props?.screen == "question3") {
    processPER = 100;
  }

  const getAnswerHandler = async () => {
    setLoading(true);

    try {
      const { data } = await getAnswer();
      // setOrders(data);

      screenHandler(data);
    } catch (error) {
      if (error?.message === "Request failed with status code 401") {
        return navigate("/switch-store");
      }

      // message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnswerHandler();
  }, []);
  // redirect to snapshot

  if (redirectToHome) {
    return <RedirectScreen iconJson={AnimationIcon} path="/plans" />;
  }

  if (loading) {
    return <Spin active></Spin>;
  }

  return (
    <div id="fade-in" className="question-screen-container">
      {props.screen === "question" && <QuestionHeader />}

      <div className="question-screen">
        {props.screen === "question" && (
          <FirstScreen onboardingAnswer={answer} navigate={navigate} />
        )}

        {props.screen === "dropship-question" && (
          <DropShipScreen onboardingAnswer={answer} navigate={navigate} />
        )}

        {props.screen === "question2" && (
          <SecondScreen onboardingAnswer={answer} navigate={navigate} />
        )}

        {props.screen === "question3" && (
          <ThirdScreen
            onboardingAnswer={answer}
            setRedirectToHome={setRedirectToHome}
            navigate={navigate}
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
      </div>
    </div>
  );
};
export default QuestionScreen;

const QuestionHeader = () => (
  <div className="top-heading">
    <h1>Help us personalise your journey.</h1>
    <h2>Please answer 3 simple questions to help us know you more.</h2>
    <h3>And, 🔓Unlock Free Bonuses!</h3>
  </div>
);
