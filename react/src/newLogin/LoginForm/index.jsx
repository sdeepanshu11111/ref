import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../store";
import { Button, Form, Input, Alert, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import VfulfillLogo from "../../assets/Icons/Vflogo";
import axios from "axios";
import VfRound from "../../assets/Icons/VfRound";
import { motion } from "framer-motion";
import "./index.scss";
import { GoogleIcon } from "../../assets/Icons/GoogleIcon";
import { AnimatedSubmitBtn } from "../SignupForm/FormItems";

const LoginForm = (props) => {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { signIn, loadingTrue, removeError } = bindActionCreators(
    Actions,
    dispatch
  );
  const { authError } = auth;

  const [state, setState] = useState({ email: "" });

  useEffect(() => {
    if (auth.auth.logged_in) {
      return navigate("/switch-store");
    }
  });

  useEffect(() => {
    let storeId = props.match?.params?.module;

    if (storeId) {
      axios({
        url: import.meta.env.VITE_REACT_API_URL + storeId,
        method: "post",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.success === 1) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { data: res.data.data },
            });
          } else {
            dispatch({ type: "LOGIN_ERROR", err: res.data.msg });
          }
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_ERROR", err });
        });
    }

    if (authError) {
      removeError();
    }
  }, []);

  useEffect(() => {
    if (authError) {
      removeError();
    }
  }, [props.match]);

  const handleSubmit = (values) => {
    removeError();
    loadingTrue();
    signIn(values);
  };

  useEffect(() => {
    if (auth.auth.logged_in && auth?.auth?.user?.user_phone !== "") {
      return navigate("/switch-store");
    }
  }, [auth]);

  return (
    <motion.div
      id="fade-in"
      className="login-form"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="hidden-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <VfRound />
      </motion.div>

      <div className="heading-bar">
        <motion.div
          className="main-heading"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Welcome to vFulfill
        </motion.div>
        <motion.div
          className="sub-heading"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Please enter your credentials to sign in
        </motion.div>
      </div>
      <Form layout="vertical" onFinish={handleSubmit} noValidate>
        <div className="flex-form">
          <div className="row-container">
            <Form.Item
              type="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter your email!",
                },
              ]}
              name="email"
            >
              <Input
                placeholder="Enter your email"
                onChange={(e) => {
                  setState({
                    email: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              type="password"
              label="Password"
              placeholder="Your Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              name="password"
              className="password-item"
            >
              <Input.Password
                placeholder="Enter your password"
                className="input-signup22"
              />
            </Form.Item>
          </div>

          <div className="flex-row flex-row-left ">
            <Checkbox defaultChecked={true}> Remember me </Checkbox>
            <Button
              onClick={() => {
                props.setSignupData(state.email);
                props.setActiveComp("forgot");
              }}
              className="forgetBtn"
            >
              Forgot password?
            </Button>
          </div>
          {authError && authError !== "Request failed with status code 401" && (
            <Alert message={authError} type="error" className="alert-error" />
          )}
          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                loading={auth?.loading}
                htmlType="submit"
                className="submit-btn"
              >
                Sign In
              </Button>
            </motion.div>
          </Form.Item>
        </div>
      </Form>

      <motion.a
        className="google-btn"
        href={`${import.meta.env.VITE_REACT_API_URL}/auth/googleLogin`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Or, continue with
        <span className="icon-container">
          <GoogleIcon />
        </span>
        Google
      </motion.a>

      <span className="color text-[#505050] font-[16px] cursor-pointer text-center flex items-center justify-center gap-1">
        Don’t have an account?{" "}
        <a className="color-[#6450D3]" onClick={() => navigate("/signup")}>
          Sign Up
        </a>
      </span>
    </motion.div>
  );
};

export default LoginForm;
