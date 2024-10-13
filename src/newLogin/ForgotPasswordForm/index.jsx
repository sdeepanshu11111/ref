import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import WingsMan from "../../assets/Icons/WingsMan";
import { motion } from "framer-motion";
import { bindActionCreators } from "redux";
import { Actions } from "../../store";
import { showNewMessage } from "@intercom/messenger-js-sdk";
import { useNavigate } from "react-router-dom";
import VfulfillLogo from "../../assets/Icons/Vflogo";
import VfRound from "../../assets/Icons/VfRound";
import "./index.scss";

const ForgotForm = (props) => {
  const dispatch = useDispatch();

  const { signIn, removeError } = bindActionCreators(Actions, dispatch);
  const auth = useSelector((state) => state.auth);
  const [disabled, setDisabled] = useState(false);

  const { authError } = auth;

  let navigate = useNavigate();

  // mount
  useEffect(() => {
    if (authError) {
      removeError();
    }
  }, []);

  const [state, setState] = useState({
    sentSuccessfully: false,
    loading: false,
    showMsg: false,
    msgType: "error",
    msg: "",
  });

  useEffect(() => {
    if (props.activeComp !== "forgot") {
      setState({
        sentSuccessfully: false,
        loading: false,
        showMsg: false,
        msgType: "error",
        msg: "",
      });
    }
  }, [props.activeComp]);

  const onFinish = (values) => {
    removeError();
    setState({
      sentSuccessfully: false,
      loading: true,
      showMsg: false,
      msgType: "error",
      msg: "",
    });

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/password_reset",
      method: "post",
      data: {
        email: values.email,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          setState({
            ...state,
            showMsg: true,
            loading: false,
            msgType: "success",
            msg: "Please check your email inbox for password reset instructions",
            sentSuccessfully: true,
          });

          setDisabled(true);
        } else {
          setState({
            ...state,
            showMsg: true,
            loading: false,
            msgType: "error",
            msg: res.data.msg,
          });
        }
      })
      .catch((e) => {
        setState({
          ...state,
          showMsg: true,
          loading: false,
          msgType: "error",
          msg: e.message,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="forgot-password-form">
      <div className="hidden-image">
        <VfRound />
      </div>

      <div className="heading-bar">
        <motion.div
          className="main-heading"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Forgot Password
        </motion.div>
        <motion.div
          className="sub-heading"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Please enter your email to receive reset instructions
        </motion.div>
      </div>

      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please enter your E-mail!",
            },
          ]}
        >
          <Input
            disabled={disabled}
            autoComplete="username"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item>
          {state.showMsg && (
            <Alert className="mb-4" message={state.msg} type={state.msgType} />
          )}

          <Button
            disabled={disabled}
            className="submit-btn"
            loading={state.loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Send Password Reset Link
          </Button>
        </Form.Item>
      </Form>
      <span className="color text-[#505050] font-[14px] cursor-pointer text-center flex items-center justify-center gap-1">
        Back to{" "}
        <a
          className="color-[#6450D3]"
          onClick={() => props.setActiveComp("login")}
        >
          Sign In
        </a>
      </span>
    </div>
  );
};
export default ForgotForm;
