import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Checkbox, Skeleton, message } from "antd";
import { Progress } from "antd";
import "./index.scss";
import { LeftArrowGrey } from "../../../../../assets/Icons/LeftArrowGrey";
const index = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const question = props.question;
  // if(loading){
  //     return <Skeleton active />
  // }
  const validateSelectAll = () => {
    var allcheckboxes = [];
    for (var i = 0; i < question.answers.length; i++) {
      allcheckboxes.push(question.answers[i].key);
    }
    var scboxes = [];
    if (
      selectedCheckboxes !== null &&
      selectedCheckboxes !== undefined &&
      typeof selectedCheckboxes === "object"
    ) {
      scboxes = JSON.parse(JSON.stringify(selectedCheckboxes));
    }
    if (scboxes.length == 0) {
      scboxes = JSON.parse(JSON.stringify(props.selectedCheckboxes));
    }

    if (allcheckboxes.sort().join(",") === scboxes.sort().join(",")) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  };
  useEffect(() => {
    setSelectedAnswer(props.selectedAnswer);
  }, [props.selectedAnswer]);

  useEffect(() => {
    setSelectedCheckboxes(props.selectedCheckboxes);
    validateSelectAll();
  }, [props.selectedCheckboxes]);

  useEffect(() => {
    validateSelectAll();
  }, [selectedCheckboxes]);

  const handleCheckbox2 = (key, checked) => {
    var answers = JSON.parse(JSON.stringify(selectedCheckboxes));
    if (answers.indexOf(key) === -1) {
      answers.push(key);
    } else {
      answers = answers.filter((x) => x != key);
    }
    setSelectedCheckboxes(answers);
    validateSelectAll();
  };
  const handleSelectAll = (checked) => {
    var answers = [];
    if (checked) {
      for (var i = 0; i < question.answers.length; i++) {
        answers.push(question.answers[i].key);
      }
    }
    setSelectedCheckboxes(answers);
  };
  const submitHandler = () => {
    if (question.type.indexOf("multiselect") === -1) {
      props.submitAnswerHandler(selectedAnswer);
    } else {
      props.submitAnswerHandler(selectedCheckboxes);
    }
    setSelectedAnswer(null);
  };
  return (
    <>
      <div className="QuestionSection">
        <div className="question-line">
          <h1>{question.qtext}</h1>
          {question.byline ? (
            <div className="question-byline">{question.byline}</div>
          ) : (
            ""
          )}
          {question.type == "column2-multiselect" ? (
            <div className="question-multiselect-byline-area">
              <div>Select All</div>
              <div>(You can select multiple options)</div>
              <div>
                <Checkbox
                  checked={selectAllChecked}
                  onChange={(e) => {
                    handleSelectAll(e.target.checked);
                  }}
                >
                  Select All
                </Checkbox>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`option-wrapper ${question.type} ${
            question.answers[0].byline ? "bylinecont" : ""
          }`}
        >
          {question.answers.map((option, index) =>
            question.type.indexOf("multiselect") === -1 ? (
              <motion.div
                key={option.key}
                onClick={() => setSelectedAnswer(option.key)}
                className={`custom-select-btn ${
                  selectedAnswer === option.key ? "selected" : ""
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
                <div>
                  {option.label}
                  {option.byline ? <span>{option.byline}</span> : ""}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={option.key}
                // onClick={() => setSelectedAnswer(option.key)}
                onClick={() => handleCheckbox2(option.key)}
                className={`custom-select-btn ${
                  selectedCheckboxes.indexOf(option.key) == -1 ? "" : "selected"
                }`}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Checkbox
                  checked={
                    selectedCheckboxes.indexOf(option.key) == -1
                      ? ""
                      : "checked"
                  }
                >
                  {option.label}
                </Checkbox>
              </motion.div>
            )
          )}
        </div>

        <div className="button-wrapper">
          <Button
            loading={props.loading}
            id="fade-in"
            disabled={
              (selectedAnswer !== null && selectedAnswer !== "") ||
              selectedCheckboxes?.length > 0
                ? false
                : true
            }
            size="large"
            type="primary"
            className="continue-btn"
            onClick={() => submitHandler()}
          >
            {question.final ? "Finish Setup" : "Continue"}
          </Button>
          <Progress
            lineBorderRadius={0}
            percent={props.progress_percentage}
            trailColor="#DCEFDF"
            strokeColor="#45EA1E"
            showInfo={false}
          />
        </div>
        {question.id != "q1" ? (
          <div className="previous-question-btn-wrapper">
            <a onClick={() => props.handleShowPreviousQuestion(question)}>
              <LeftArrowGrey />
              Go to previous question
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default index;
