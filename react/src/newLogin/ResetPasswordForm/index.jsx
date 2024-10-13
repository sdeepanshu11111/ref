import React, { useState } from "react";
import { Button, Form, Input, Alert, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VfRound from "../../assets/Icons/VfRound";
import "./index.scss";
import { VfulfillBlackLogo } from "../../assets/vFulfillBlackLogo";

const ResetForm = (props) => {
  let navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorCard, setErrorCard] = useState({
    show: false,
    msg: "",
  });
  const onFinish = (values) => {
    setErrorCard({
      show: false,
      msg: "",
    });
    let data = {
      hash: props?.hash?.params?.hash,
      password: values.password,
      cpassword: values.cpassword,
    };

    setIsSubmiting(true);
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/verify_password_reset",
      method: "post",
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          navigate("/login");
          message.success("Password Reset Successfully");
        } else {
          message.error(res.data.msg);
          setErrorCard({
            show: true,
            msg: res.data.msg,
          });
        }
        setIsSubmiting(false);
      })
      .catch((e) => {
        message.error(e.message);
        setIsSubmiting(false);
        setErrorCard({
          show: true,
          msg: e.message,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="reset-password-form">
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
          Reset Password
        </motion.div>
        <motion.div
          className="sub-heading"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Your new password must different to previous password
        </motion.div>
      </div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="password"
          autoFocus="false"
          label="Enter New Password"
          normalize={(value) => value.trim()}
          rules={[
            { required: true, message: "Please enter a password !" },
            { min: 7, message: "Password must be at least 7 characters !" },
          ]}
        >
          <Input.Password
            autoFocus={false}
            placeholder="Enter your new Password"
          />
        </Form.Item>
        <br />
        <Form.Item
          name="cpassword"
          autoFocus="false"
          normalize={(value) => value.trim()}
          dependencies={["password"]}
          label="Confirm New Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords that you entered do not match !")
                );
              },
            }),
          ]}
        >
          <Input.Password
            autoFocus={false}
            placeholder="Re-enter your new Password"
          />
        </Form.Item>

        <Form.Item>
          {errorCard.show && (
            <Alert className="mb-4" message={errorCard.msg} type="error" />
          )}

          <Button
            className="submit-btn mt-5"
            loading={isSubmiting}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span className="mt-6 color text-[#505050] font-[14px] cursor-pointer text-center flex items-center justify-center gap-1">
        Back to{" "}
        <a className="color-[#6450D3]" onClick={() => props.navigate("/login")}>
          Sign In
        </a>
      </span>
    </div>
  );
};
export default ResetForm;
