import React from "react";
import SignupQuestionsForm from "./SignupQuestionsForm";
import ScreenWapper from "../../ScreenWapper";
import { useSelector } from "react-redux";
const index = (props) => {
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    document.title = props?.title;
  }, [props?.title]);

  return (
    <div className="SignupQuestionairre">
      <ScreenWapper
        active={2}
        type={auth?.auth?.user?.user_type == "GOOGLE" ? "contact-details" : ""}
      >
        <SignupQuestionsForm />
      </ScreenWapper>
    </div>
  );
};

export default index;
