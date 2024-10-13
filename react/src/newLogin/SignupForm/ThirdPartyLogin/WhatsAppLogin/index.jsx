import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Button, Form, message } from "antd";
import {
  WhatsappBigIc,
  EditIc,
  ResendIcon,
} from "../../../../assets/Icons/GoogleIcon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import usePostRequest from "../../../../CustomHooks/usePostRequest";
import { motion } from "framer-motion";

const WhatsAppOTP = (props) => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState({
    number: "",
    prefix_1: "+91",
  });

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const countdownRef = useRef(null);
  const otpRef = useRef(null);
  const { loading, sendPostRequest } = usePostRequest();

  const handleEditNumber = () => {
    setIsOtpSent(false);
    setIsEditing(true);
    setOtp("");
    stopCountdown();
  };

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopCountdown();
  }, []);
  useEffect(() => {
    setPhoneNumber({
      number: "",
      prefix_1: "+91",
    });
    setOtp("");
    setTimer(30);
    setIsOtpSent(false);
    setIsEditing(true);
  }, [props.open]);

  const handleContactChange = (ob) => {
    const onlyNumber = ob.value
      .replace(/[^0-9]+/g, "")
      .slice(ob.extraVal?.dialCode.length || 0);
    setPhoneNumber({
      number: onlyNumber,
      prefix_1: ob.extraVal.dialCode || "",
    });
  };

  const onFinish = async (values) => {
    values.user_phone = {
      code: phoneNumber.prefix_1,
      number: phoneNumber.number,
    };

    delete values["whatsapp"];

    try {
      const res = await sendPostRequest("/v2/signup/whatsappsignup", values);
      if (res.success === 1) {
        message.success(res.msg);
        setIsOtpSent(true);
        setIsEditing(false);
        setTimer(30);
        startCountdown();
      } else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const resendHandler = async () => {
    let data = {
      user_phone: {
        code: phoneNumber.prefix_1,
        number: phoneNumber.number,
      },
    };

    try {
      const res = await sendPostRequest("/v2/signup/whatsappsignup", data);
      if (res.success === 1) {
        message.success(res.msg);
        setIsOtpSent(true);
        setIsEditing(false);
        setTimer(30);
        startCountdown();
      } else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleChangeWhiteSpace = (e) => {
    if (e.clipboardData.getData("Text").trim().replaceAll(" ", "").length < 7) {
      setOtp(e.clipboardData.getData("Text").trim().replaceAll(" ", ""));
    } else {
      return;
    }
  };

  const otpSubmitHandler = async () => {
    let data = {
      user_phone: {
        code: phoneNumber.prefix_1,
        number: phoneNumber.number,
      },
      otp: otp,
    };

    try {
      const res = await sendPostRequest("/v2/signup/verifywhatsappotp", data);
      if (res.success === 1) {
        message.success(res.msg);

        navigate("/question");
      } else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Modal
      open={props?.open}
      title={null}
      footer={null}
      onCancel={() => props.cancel()}
      closable={true}
      className="whatsapp-login-modal"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 align="center" justify="center" gap={6}>
          Signing you up via <WhatsappBigIc /> WhatsApp
        </h1>

        <motion.div
          className="input-wraper"
          style={{ marginBottom: "10px" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError={true}
            autoComplete="off"
          >
            <Form.Item
              className="phone-relative"
              label="WhatsApp Phone number"
              name="whatsapp"
              rules={[
                {
                  required: true,
                  message: "Please input your WhatsApp number!",
                },
                {
                  min: phoneNumber.prefix_1 === "91" ? 12 : 7,
                  message: "Please input valid WhatsApp number!",
                },
              ]}
            >
              <PhoneInput
                disabled={isOtpSent}
                autoFormat={true}
                disableSearchIcon
                inputProps={{
                  name: "phone",
                  required: true,
                  placeholder: null,
                }}
                onChange={(val, extra) =>
                  handleContactChange({ value: val, extraVal: extra })
                }
                enableSearch={true}
                country={"in"}
              />
            </Form.Item>

            {!isOtpSent && (
              <Form.Item>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    className="submit-btn"
                    style={{ width: "100%" }}
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                  >
                    Send OTP
                  </Button>
                </motion.div>
              </Form.Item>
            )}
          </Form>

          {!isEditing && (
            <p className="edit-ic" onClick={handleEditNumber}>
              <EditIc />
            </p>
          )}
        </motion.div>

        {isOtpSent && (
          <>
            <motion.div
              className="otp-input-wraper"
              style={{ marginBottom: "10px", marginTop: "20px" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p> Enter OTP to verify your phone number</p>

              <OtpInput
                value={otp}
                onChange={(e) => setOtp(e)}
                numInputs={4}
                className="react-otp-field"
                inputType={"number"}
                separator={<span style={{ width: "8px" }}></span>}
                pattern="\d*"
                isInputNum={true}
                onPaste={handleChangeWhiteSpace}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} />}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
            </motion.div>
            <motion.div
              className="resend-wraper"
              style={{ textAlign: "right", marginTop: "10px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                ghost
                loading={loading}
                style={{ cursor: timer === 0 ? "pointer" : "not-allowed" }}
                disabled={timer > 0}
                onClick={() => resendHandler()}
              >
                <ResendIcon /> Resend OTP {timer > 0 && "in"}
              </Button>

              {timer > 0 && <span className="timer"> {timer} </span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => otpSubmitHandler()}
                disabled={otp.length <= 3 || loading ? true : false}
                className="verify-otp-btn"
              >
                Verify OTP & Sign Up
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </Modal>
  );
};

export default WhatsAppOTP;
