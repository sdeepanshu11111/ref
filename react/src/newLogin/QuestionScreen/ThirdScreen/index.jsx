import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, message } from "antd";
import axios from "axios";
import { ThirdScreenQuestion } from "../question";
import getAnswer from "../../API/getAnswer";
import sendAnswer from "../../API/sendAnswer";
import "./index.scss";

const ThirdScreen = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(
    props?.onboardingAnswer?.what_are_you_most_interested_in || []
  );

  const [optionsArray, setOptionsArray] = useState(
    ThirdScreenQuestion.map((d) => {
      if (selectedAnswer.includes(d.value)) {
        return { ...d, selected: true };
      } else {
        return { ...d, selected: false };
      }
    })
  );

  const [previousScreenAnswer, setPrevScreenAnswer] = useState("");

  const [answerLoading, setAnswerLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAnswerHandler = async () => {
    setAnswerLoading(true);

    try {
      const { data } = await getAnswer();
      // setOrders(data);

      setPrevScreenAnswer(data?.how_would_you_indentify_yourself);
    } catch (error) {
      // message.error(error.message || "An error occurred while fetching data");
    } finally {
      setAnswerLoading(false);
    }
  };
  const submitAnswerHandler = async () => {
    setLoading(true);

    const apiPayload = {
      key: "what_are_you_most_interested_in",
      value: selectedAnswer,
    };

    try {
      const { data } = await sendAnswer(apiPayload);

      props.setRedirectToHome(true);
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnswerHandler();
  }, [props?.screen]);

  const handleOptionClick = (option) => {
    const updatedOptions = optionsArray.map((opt) =>
      opt.id === option.id ? { ...opt, selected: !opt.selected } : opt
    );
    setOptionsArray(updatedOptions);
    const selectedOptions = updatedOptions.filter((opt) => opt.selected);
    setSelectedAnswer(selectedOptions.map((opt) => opt.value));
  };

  return (
    <div className="question-screen3">
      <div className="question-line">
        <h1>What are you most interested in?</h1>
        <h2>(3/3)</h2>
      </div>

      <h3>(You can select multiple options)</h3>

      <div className="option-wrapper">
        {optionsArray.map((question, index) => (
          <motion.div
            key={question.value}
            onClick={() => handleOptionClick(question)}
            className={`custom-select-btn ${
              question.selected ? "selected" : ""
            }`}
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
            {question.label}
          </motion.div>
        ))}
      </div>

      <div className="button-wrapper">
        <Button
          onClick={() => {
            if (previousScreenAnswer.includes("dropship")) {
              props.navigate("/dropship-question?back");
            } else {
              props.navigate("/question2?back");
            }
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
          disabled={selectedAnswer.length === 0}
          type="primary"
          className="continue-btn"
          onClick={() => submitAnswerHandler()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ThirdScreen;
