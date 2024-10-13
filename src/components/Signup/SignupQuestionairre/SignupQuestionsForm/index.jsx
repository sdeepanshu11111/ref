import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../../store";
import QuesstionSection from "./QuestionSection";
import { allquestions } from "./questions";
import { allflows } from "./flows";
import { VfulfillBlackLogo } from "../../../../assets/vFulfillBlackLogo";
import sendAnswer from "../../../../newLogin/API/sendAnswer";
import getAnswer from "../../../../newLogin/API/getAnswer";
import { Skeleton, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.scss";
const index = (props) => {
  let navigate = useNavigate();
  var i = 0;
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(allquestions[questionIndex]);
  const [flow, setFlow] = useState({});
  const [qanswers, setQanswers] = useState({});
  const [progressP, setProgressP] = useState(50);

  const dispatch = useDispatch();
  const { signOut, loadingTrue } = bindActionCreators(Actions, dispatch);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.auth.logged_in) {
      return navigate("/login");
    }
  }, [auth]);

  const submitAnswerHandler = async (val) => {
    // setLoading(true);
    const apiPayload = {
      key: question.id,
      value: val,
    };
    var tempqa = JSON.parse(JSON.stringify(qanswers));
    tempqa[question.id] = val;
    setQanswers(tempqa);
    try {
      if (question.final) {
        await sendAnswer(apiPayload);
        navigate("/plans");
      } else {
        sendAnswer(apiPayload);
        if (question.type.indexOf("multiselect") === -1) {
          var answerObj = question.answers.filter((x) => {
            return x.key == val;
          })[0];
        } else {
          var answerObj = question.answers.filter((x) => {
            return x.key == val[0];
          })[0];
        }
        if (answerObj.flowid !== undefined) {
          var tempflow = allflows.filter((x) => {
            return x.flowid == answerObj.flowid;
          })[0];
          setFlow(tempflow);
          setProgressP(tempflow.questions[0].continue_percentage); // first question from flows
          setQuestionIndex(0);
          var nextq = allquestions.filter((x) => {
            return x.id == tempflow.questions[0].qid;
          })[0];
        } else {
          if (answerObj.nextq !== undefined) {
            var nextq = allquestions.filter((x) => {
              return x.id == answerObj.nextq;
            })[0];
            setProgressP(100); // flow 3 last questions
          } else {
            var i = questionIndex + 1;
            setQuestionIndex(i);
            var nextq = allquestions.filter((x) => {
              return x.id == flow.questions[i].qid;
            })[0];
            setProgressP(flow.questions[i].continue_percentage); /// usual flow questions
          }
        }
        setQuestion(nextq);
      }
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      // setLoading(false);
    }
  };

  const getAnswerHandler = async () => {
    setLoading(true);
    try {
      const { data } = await getAnswer();
      if (data["q1"] !== undefined) {
        var question = allquestions.filter((x) => x.id == "q1");
        var flowid = question[0].answers.filter((x) => x.key == data["q1"])[0]
          .flowid;
        var flow = allflows.filter((x) => x.flowid == flowid)[0];
        var flg = 0;
        for (i = 0; i < flow.questions.length; i++) {
          if (data[flow.questions[i].qid] === undefined) {
            question = allquestions.filter(
              (x) => x.id == flow.questions[i].qid
            );
            setFlow(flow);
            setQuestionIndex(i);
            setQuestion(question[0]);
            setProgressP(flow.questions[i].continue_percentage);
            setQanswers(data);
            flg = 1;
            break;
          }
        }
        if (flg == 0) {
          return navigate("/plans");
        }
      }
    } catch (error) {
      if (error?.message === "Request failed with status code 401") {
        return navigate("/switch-store");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnswerHandler();
  }, []);

  const handleShowPreviousQuestion = () => {
    var prevq = allquestions.filter((x) => {
      return x.id == "q1";
    })[0];
    setProgressP(50); // First question
    if (question.prevq !== undefined) {
      prevq = allquestions.filter((x) => {
        return x.id == question.prevq;
      })[0];
      setProgressP(60); //flow 3
    } else {
      let i = questionIndex - 1;
      setQuestionIndex(i);
      if (i >= 0) {
        var prevq = allquestions.filter((x) => {
          return x.id == flow.questions[i].qid;
        })[0];
        setProgressP(flow.questions[i].continue_percentage); /// usual flow questions
      }
    }
    setQuestion(prevq);
  };

  return (
    <>
      <div id="fade-in" className="SignupQuestionsForm">
        <QuestionHeader />
        <>
          {loading ? (
            <Skeleton active></Skeleton>
          ) : (
            <QuesstionSection
              question={question}
              submitAnswerHandler={submitAnswerHandler}
              selectedAnswer={
                qanswers[question.id] != undefined &&
                qanswers[question.id] != null
                  ? qanswers[question.id]
                  : null
              }
              selectedCheckboxes={
                qanswers[question.id] === undefined
                  ? []
                  : typeof qanswers[question.id] === "object"
                  ? qanswers[question.id]
                  : []
              }
              handleShowPreviousQuestion={handleShowPreviousQuestion}
              progress_percentage={progressP}
              loading={loading}
            />
          )}
        </>
      </div>
      {/* <div className="save-logout" onClick={() => signOut()}>
        Save details & sign out
      </div> */}
    </>
  );
};
const QuestionHeader = () => (
  <div className="top-heading">
    <div className="top-logo">
      <VfulfillBlackLogo />
    </div>
    <h1>Personalize your account</h1>
    <h2>Answer a few simple questions to customise your experience</h2>
    <h3>And, 🔓 Unlock Free Bonuses!</h3>
  </div>
);

export default index;
