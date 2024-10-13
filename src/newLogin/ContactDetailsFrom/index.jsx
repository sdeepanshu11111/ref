import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScreenWapper from "../../components/ScreenWapper";
import { motion } from "framer-motion";
import "./index.scss";
import {
  AnimatedInvitationCodeInput,
  AnimatedInvitationCodeSwitch,
  AnimatedMobileNumber,
  AnimatedPrivacyCheckbox,
  AnimatedSubmitBtnContactDetail,
  AnimatedWhatsAppDifferentSwitch,
  AnimatedWhatsAppPhoneNumber,
  AnimatedWinningProductCheckbox,
} from "../SignupForm/FormItems";
import usePostRequest from "../../CustomHooks/usePostRequest";
import { VFulfillIcon } from "../../assets/Icons/VFulfillIcon";
import { bindActionCreators } from "redux";
import { Actions } from "../../store";
import withAuth from "../../components/HOC/withAuth";

const ContactDetailsFrom = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [mobileNumber, setMobileNumber] = useState({
    number: "",
    prefix_1: "",
  });
  const [whatsappPhone, setWhatsappPhone] = useState({
    number: "",
    prefix_1: "",
  });
  const dispatch = useDispatch();
  const { switchStore } = bindActionCreators(Actions, dispatch);
  const [invitation, setInvitation] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [whatsappDifferentNumber, setWhatsappDifferentNumber] = useState(false);
  const { loading, sendPostRequest } = usePostRequest();

  const onFinish = async (values) => {
    values.user_phone = {
      code: mobileNumber.prefix_1,
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
      const res = await sendPostRequest(
        "/v2/signup/save_communication_address_google_login",
        values
      );
      if (res.success === 1) {
        // switchStore();
        return navigate("/signup-questionairre");
      } else {
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
  // useEffect(()=>{
  //   if (auth?.auth?.user?.subscription == "active”) {
  //     return navigate("/home");
  //   }
  // },[auth]);
  useEffect(() => {
    if (!!auth?.auth?.user?.user_phone) {
      return navigate("/home");
    }
  }, [auth]);
  useEffect(() => {
    switchStore();
  }, []);
  useEffect(() => {
    document.title = props?.title;
  }, [props.title]);
  return (
    <ScreenWapper type="contact-details" active={1}>
      <div className="contact-details-section-container">
        <div className="heading-icon-container">
          <div className="logo-container">
            {" "}
            <VFulfillIcon />
          </div>

          <div className="welcome-heading">Complete your sign up</div>
          <div className="info-email">Provide your contact details</div>
        </div>
        <div className="contact-detail-form-container">
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
            }}
          >
            <div className="row-container">
              <AnimatedMobileNumber
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
              />
            </div>

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
            </div>
            <div className="row-container invitation-code-container">
              <AnimatedInvitationCodeSwitch setInvitation={setInvitation} />
              {invitation && <AnimatedInvitationCodeInput />}
            </div>

            <div className="checkbox-container">
              <AnimatedWinningProductCheckbox />
              <AnimatedPrivacyCheckbox />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <AnimatedSubmitBtnContactDetail loading={loading} />
            </motion.div>
          </Form>
        </div>
      </div>
    </ScreenWapper>
  );
};

export default ContactDetailsFrom;
