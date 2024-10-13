import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, message } from "antd";
import sendAnswer from "../../newLogin/API/sendAnswer";
import { FourthScreenQuestion } from "../question";

import "./index.scss";

const FourthScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(props.selectedAnswer);

  useEffect(() => {
    setSelectedAnswer(props.selectedAnswer);
  }, [props.selectedAnswer]);

  const submitAnswerHandler = async () => {
    setLoading(true);

    const apiPayload = {
      key: "average_selling_price",
      value: selectedAnswer,
    };

    try {
      const { data } = await sendAnswer(apiPayload);
      props.setCurrentScreen("5");
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-screen4">
      <div className="question-line">
        <h1>What is your average selling price? </h1>
        <h2>(2/3)</h2>
      </div>

      <div className="option-wrapper">
        {FourthScreenQuestion.map((question, index) => (
          <motion.div
            key={question.value}
            onClick={() => props.setSelectedAnswer(question.value)}
            className={`custom-select-btn ${
              props.selectedAnswer === question.value ? "selected" : ""
            }`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="check_circle_FILL1_wght300_GRAD0_opsz24"
                d="M106.806-848.417l5.662-5.661-.887-.887-4.774,4.774-2.4-2.4-.887.887ZM108-844a7.793,7.793,0,0,1-3.12-.63,8.081,8.081,0,0,1-2.541-1.71,8.079,8.079,0,0,1-1.71-2.54A7.786,7.786,0,0,1,100-852a7.793,7.793,0,0,1,.63-3.12,8.082,8.082,0,0,1,1.71-2.541,8.078,8.078,0,0,1,2.54-1.71A7.785,7.785,0,0,1,108-860a7.793,7.793,0,0,1,3.12.63,8.079,8.079,0,0,1,2.541,1.71,8.077,8.077,0,0,1,1.71,2.54A7.786,7.786,0,0,1,116-852a7.793,7.793,0,0,1-.63,3.12,8.082,8.082,0,0,1-1.71,2.541,8.08,8.08,0,0,1-2.54,1.71A7.787,7.787,0,0,1,108-844Z"
                transform="translate(-100.001 859.999)"
                fill="#ddd"
              />
            </svg>
            <div>
              <h1>{question.label}</h1> <h2>{question.subLabel}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="button-wrapper">
        <Button
          onClick={() => {
            props.setCurrentScreen("3");
          }}
          id="fade-in"
          type="cancel"
          className="back-btn"
        >
          Back
        </Button>
        <Button
          loading={loading}
          id="fade-in"
          disabled={props.selectedAnswer?.length === 0}
          type="primary"
          className="continue-btn"
          onClick={() => {
            submitAnswerHandler();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FourthScreen;
