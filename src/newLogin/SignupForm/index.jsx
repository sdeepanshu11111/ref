import React, { useEffect, useState } from "react";
import { Button, Form, message,Input } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../store";
import { bindActionCreators } from "redux";
import usePostRequest from "../../CustomHooks/usePostRequest";
import { motion } from "framer-motion";
import ThirdPartyLogin from "./ThirdPartyLogin";
import RightBanner from "./RightBanner";
import Logo from "../../assets/Icons/VflogoFull";
import VfRound from "../../assets/Icons/VfRound";
import getAnswer from "../API/getAnswer";
import {
  AnimatedFullName,
  AnimatedMobileNumber,
  AnimatedEmail,
  AnimatedPassword,
  AnimatedInvitationCodeSwitch,
  AnimatedInvitationCodeInput,
  AnimatedModeOfCommunication,
  AnimatedWhatsAppPhoneNumber,
  AnimatedWinningProductCheckbox,
  AnimatedPrivacyCheckbox,
  AnimatedSubmitBtn,
  AnimatedLoginLine,
  AnimatedSkypeInput,
  AnimatedWhatsAppDifferentSwitch,
} from "./FormItems/index";
import { VFulfillIcon } from "../../assets/Icons/VFulfillIcon";
import { PlaceholderUser } from "../../assets/Icons/PlaceholderUser";
import { GoogleIcon } from "../../assets/Icons/GoogleIcon";

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { authError, auth = {} } = useSelector((state) => state.auth);
  const [mobileNumber, setMobileNumber] = useState({
    number: "",
    prefix_1: "",
  });
  const [whatsappPhone, setWhatsappPhone] = useState({
    number: "",
    prefix_1: "",
  });
  const [signupError, setSignupError] = useState("");

  const [invitation, setInvitation] = useState(false);

  const [whatsappDifferentNumber, setWhatsappDifferentNumber] = useState(false);
  const { loading, sendPostRequest } = usePostRequest();
  const { signIn, removeError } = bindActionCreators(Actions, dispatch);

  const onFinish = async (values) => {
    removeError();
    values.number = {
      country_code: mobileNumber.prefix_1,
      number: mobileNumber.number,
    };
    if (whatsappDifferentNumber) {
      values.whatsappnumber = {
        code: whatsappPhone.prefix_1,
        number: whatsappPhone.number,
      };
    }

    delete values["phone"];
    delete values["whatsapp_phone"];

    try {
      const res = await sendPostRequest("", values);


      if(res.message === "User created successfully"){
        message.success(res.message)
        props.setActiveComp("login");
      }

      // if (res.success === 1) {
      //   getAnswer();
      //   props.setSignupData({ email: values.email, password: values.password });
      //   message.success(res.msg);
      //   props.setActiveComp("otp");
      // }
      
      else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const onFinishFailed = () => {
    setTimeout(() => {
      document.querySelector(".ant-form-item-explain-error")?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 300);
  };
  useEffect(() => {
    if (auth?.logged_in) {
      return navigate("/switch-store");
    }
  });
  useEffect(() => {
    if (authError) {
      removeError();
    }
  }, []);
  return (
    <div id="fade-in" className="signUp-form-container form-wapper-login">
      <div className="hidden-image">
        <VfRound />
      </div>

      <div className="heading-container">
        <div className="mb-6">
          <h3 className="mb-1 text-2xl font-bold">Sign Up</h3>
          <p className="text-[#848484] text-sm">
            And lets get started with vFulfill
          </p>
        </div>
      </div>

      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        scrollToFirstError={true}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          winning_product_checked: true,
          privacy_policy_checked: true,
          mode_of_communication: "whatsapp",
        }}
      >
        <div className="row-container">
          <AnimatedFullName />
          <AnimatedEmail
            setSignupData={props.setSignupData}
            signupData={props?.signupData}
          />
        </div>

        <Form.Item
    label="Address"
    name="address"
    rules={[{ required: true, message: "Please enter address !" }]}
  >
    <Input placeholder="Enter your name" />
  </Form.Item>

        <div className="row-container">
          <AnimatedMobileNumber
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
          <AnimatedPassword />
        </div>
        {/* 
          <div className="row-container invitation-code-container">
            <AnimatedWhatsAppDifferentSwitch
              setWhatsappDifferentNumber={setWhatsappDifferentNumber}
            />
            {whatsappDifferentNumber && (
              <AnimatedWhatsAppPhoneNumber
                whatsappPhone={whatsappPhone}
                setWhatsappPhone={setWhatsappPhone}
              />
            )}
          </div> */}
        {/* <div className="row-container invitation-code-container">
            <AnimatedInvitationCodeSwitch setInvitation={setInvitation} />
            {invitation && <AnimatedInvitationCodeInput />}
          </div> */}



        <motion.div whileTap={{ scale: 0.95 }}>
          <AnimatedSubmitBtn
            authError={authError}
            signupError={signupError}
            loading={loading}
          />
        </motion.div>
      </Form>

      {/* <motion.a
        className="google-btn"
        href={`${import.meta.env.VITE_REACT_API_URL}/auth/googleLogin`}
        // onClick={()=>{navigate("/contact")}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Or, Sign Up via
        <span className="icon-container">
          <GoogleIcon />
        </span>{" "}
        Google
      </motion.a> */}

      <span className="color text-[#505050] font-[14px] cursor-pointer text-center flex items-center justify-center gap-1">
        Already have an account?
        <a className="color-[#6450D3]" onClick={() => navigate("/login")}>
          Sign in
        </a>
      </span>
    </div>
  );
};

export default SignUpForm;
