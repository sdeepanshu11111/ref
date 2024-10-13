import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import sendAnswer from "../../newLogin/API/sendAnswer";

import { ThirdScreenQuestion } from "../question";

import "./index.scss";

const ThirdScreen = (props) => {
  const [optionsArray, setOptionsArray] = useState(
    ThirdScreenQuestion.map((d) => {
      if (props.selectedAnswer.includes(d.value)) {
        return { ...d, selected: true };
      } else {
        return { ...d, selected: false };
      }
    })
  );
  const [selectedAnswer, setSelectedAnswer] = useState(props.selectedAnswer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedAnswer(props.selectedAnswer);
  }, [props.selectedAnswer]);

  const submitAnswerHandler = async () => {
    setLoading(true);

    const apiPayload = {
      key: "niches",
      value: selectedAnswer,
    };

    try {
      const { data } = await sendAnswer(apiPayload);
      props.setCurrentScreen("4");
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    const alreadySelected = props.selectedAnswer.includes(option.value);
    if (
      (alreadySelected && props.selectedAnswer.length === 1) ||
      (!alreadySelected && props.selectedAnswer.length === 5)
    ) {
      return;
    }

    const updatedOptions = optionsArray.map((opt) =>
      opt.id === option.id ? { ...opt, selected: !opt.selected } : opt
    );
    setOptionsArray(updatedOptions);

    const selectedOptions = updatedOptions.filter((opt) => opt.selected);
    props.setSelectedAnswer(selectedOptions.map((opt) => opt.value));
  };

  return (
    <div className="onboarding-screen3">
      <div className="question-line">
        <h1>What categories of products do you mainly market?</h1>
        <h2>(1/3)</h2>
      </div>

      <h3>(Select maximum 5)</h3>

      <div className="option-wrapper">
        {optionsArray.map((question, index) => (
          <motion.div
            key={question.value}
            onClick={() => handleOptionClick(question)}
            className={`custom-select-btn ${
              props.selectedAnswer.includes(question.value) ? "selected" : ""
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
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
            {question.label}
          </motion.div>
        ))}
      </div>

      <div className="button-wrapper">
        <Button
          onClick={() => {
            props.setCurrentScreen("2");
          }}
          id="fade-in"
          type="cancel"
          className="back-btn"
        >
          Back
        </Button>
        <Button
          id="fade-in"
          loading={loading}
          disabled={props.selectedAnswer.length === 0}
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

export default ThirdScreen;
