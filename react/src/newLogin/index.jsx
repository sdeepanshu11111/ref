import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../store";
import LoginForm from "./LoginForm";
import QuestionScreen from "./QuestionScreen";
import ContactForm from "./ContactForm";
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm/index";
import ForgotPasswordFrom from "./ForgotPasswordForm";
import ResetForm from "./ResetPasswordForm";
import Side from "./Side";
import ScreenWapper from "../components/ScreenWapper";
import "./index.scss";

const NewLogin = ({
  activeTab,
  auth,
  location,
  hash,
  navigate,

  title,
}) => {
  const dispatch = useDispatch();
  const { removeError } = bindActionCreators(Actions, dispatch);
  const { authError } = auth;

  const [activeComp, setActiveComp] = useState(activeTab);
  const [signupData, setSignupData] = useState({ email: "", password: "" });

  useEffect(() => {
    setActiveComp(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (authError) {
      removeError();
    }
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const signupFormProps = {
    auth,
    signupData,
    setSignupData,
    setActiveComp,
    location,
    hash,

    navigate,
  };

  const componentConfig = {
    signup: { component: SignupForm, active: 1 },
    login: { component: LoginForm, active: 2 },
    otp: { component: OtpForm, active: 3 },
    contact: { component: ContactForm, active: 2 },
    question: {
      component: QuestionScreen,
      active: "question",
      screen: "question",
    },
    "dropship-question": {
      component: QuestionScreen,
      active: "dropship-question",
      screen: "dropship-question",
    },
    question2: {
      component: QuestionScreen,
      active: "question2",
      screen: "question2",
    },
    question3: {
      component: QuestionScreen,
      active: "question3",
      screen: "question3",
    },
    forgot: { component: ForgotPasswordFrom, active: 4 },
    "reset-password": { component: ResetForm, active: 4 },
  };

  const CurrentComponent = componentConfig[activeComp]?.component;
  const activeProp = componentConfig[activeComp]?.active;
  const additionalProps = componentConfig[activeComp]?.screen
    ? { screen: componentConfig[activeComp].screen }
    : {};

  if (activeComp === "otp") {
    return (
      <div className="new-login">
        <ScreenWapper active={1}>
          <OtpForm {...signupFormProps} />
        </ScreenWapper>
      </div>
    );
  }

  return (
    <div className="new-login">
      <Side active={activeProp}>
        {CurrentComponent && (
          <CurrentComponent {...signupFormProps} {...additionalProps} />
        )}
      </Side>
    </div>
  );
};

export default NewLogin;
