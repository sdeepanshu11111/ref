import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, message } from "antd";
import { FirstScreenQuestion } from "../question";
import sendAnswer from "../../API/sendAnswer";
import "./index.scss";

const FirstScreen = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(
    props?.onboardingAnswer?.how_would_you_indentify_yourself || ""
  );
  const [loading, setLoading] = useState(false);

  const submitAnswerHandler = async () => {
    setLoading(true);

    const apiPayload = {
      key: "how_would_you_indentify_yourself",
      value: selectedAnswer,
    };

    try {
      const { data } = await sendAnswer(apiPayload);
      if (selectedAnswer.includes("dropshipping")) {
        if (window.location.search.includes("back")) {
          return props.navigate("/dropship-question?back");
        } else {
          return props.navigate("/dropship-question");
        }
      } else {
        if (window.location.search.includes("back")) {
          return props.navigate("/question2?back");
        } else {
          return props.navigate("/question2");
        }
      }
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-screen1">
      <div className="question-line">
        <h1>What describes you the best?</h1>
        <h2>(1/3)</h2>
      </div>

      <div className="option-wrapper">
        {FirstScreenQuestion.map((question, index) => (
          <motion.div
            key={question.value}
            onClick={() => setSelectedAnswer(question.value)}
            className={`custom-select-btn ${
              selectedAnswer === question.value ? "selected" : ""
            }`}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
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
          loading={loading}
          id="fade-in"
          disabled={!selectedAnswer}
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

export default FirstScreen;
