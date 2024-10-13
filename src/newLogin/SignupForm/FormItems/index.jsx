import React from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  Flex,
  Tooltip,
  Button,
  Alert,
  Checkbox,
} from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Arrow,
  Info,
  Skype,
  SmallWhatsAppIcon,
  Telegram,
} from "../../../assets/Icons/GoogleIcon";
import LeftToRightAnimation from "../../../components/HOC/LeftToRightAnimation"; // Import the HOC
import "./index.scss";

const { Option } = Select;

const icons = {
  telegram: <Telegram />,
  whatsapp: <SmallWhatsAppIcon />,
  skype: <Skype />,
};

const communicationModeName = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  skype: "Skype",
};

const FullName = () => (
  <Form.Item
    label="Full Name"
    name="merchant_name"
    rules={[{ required: true, message: "Please enter your full name !" }]}
  >
    <Input placeholder="Enter your name" />
  </Form.Item>
);

const MobileNumber = ({ mobileNumber, setMobileNumber }) => {
  const handleContactChange = (ob) => {
    const onlyNumber = ob.value
      .replace(/[^0-9]+/g, "")
      .slice(ob.extraVal?.dialCode.length || 0);
    setMobileNumber({
      number: onlyNumber,
      prefix_1: ob.extraVal.dialCode || "",
    });
  };

  return (
    <Form.Item
      className="phone-relative"
      label="WhatsApp Mobile Number"
      name="phone"
      rules={[
        { required: true, message: "Please enter your phone number !" },
        {
          min: mobileNumber.prefix_1 === "91" ? 12 : 7,
          message: "Please enter your phone number !",
        },
      ]}
    >
      <PhoneInput
        autoFormat={true}
        id="react-tel"
        disableSearchIcon
        inputProps={{
          name: "phone",
          required: true,

          placeholder: null,
        }}
        placeholder="Enter your mobile number "
        onChange={(val, extra) =>
          handleContactChange({ value: val, extraVal: extra })
        }
        enableSearch={true}
        country={"in"}
      />
    </Form.Item>
  );
};
const Email = ({ setSignupData, signupData }) => (
  <Form.Item
    label="Email"
    name="email"
    initialValue={signupData?.email}
    rules={[
      { required: true, message: "Please enter your email !" },
      {
        type: "email",
        message: "Please enter a valid email !",
      },
    ]}
  >
    <Input
      onChange={(e) => setSignupData({ email: e.target.value })}
      autoComplete="username"
      value={signupData?.email}
      placeholder="Enter your email"
    />
  </Form.Item>
);

const Password = () => (
  <Form.Item
    name="password"
    autoFocus="false"
    label="Password"
    normalize={(value) => value.trim()}
    rules={[
      { required: true, message: "Please enter a password !" },
      { min: 7, message: "Password must be at least 7 characters !" },
    ]}
  >
    <Input.Password autoFocus={false} placeholder="Minimum 7 characters" />
  </Form.Item>
);

const InvitationCodeSwitch = ({ invitation, setInvitation }) => (
  <div className="invitation-code-wraper">
    <h1>I have an invitation code</h1>
    <Switch onChange={(checked) => setInvitation(checked)} />
    <Flex align="center">
      <Tooltip
        overlayClassName="orange-tooltip"
        color={"#E28930"}
        title="Please contact a vFulfill ambassador to receive your invite code."
      >
        <p>
          <Info />
        </p>
      </Tooltip>
    </Flex>
  </div>
);
const WhatsAppDifferentSwitch = ({ setWhatsappDifferentNumber }) => (
  <div className="invitation-code-wraper">
    <h1>I have a different number on WhatsApp</h1>
    <Switch onChange={(checked) => setWhatsappDifferentNumber(checked)} />
  </div>
);
const InvitationCodeInput = () => (
  <Form.Item
    name="invitation_code_input"
    rules={[{ required: true, message: "Enter Invitation Code !" }]}
  >
    <Input placeholder="Enter Invitation Code" className="input-code" />
  </Form.Item>
);

const ModeOfCommunication = ({ setCommunicationMode, communicationMode }) => (
  <Form.Item
    label="Preferred Mode of Communication"
    name="mode_of_communication"
    rules={[{ required: true, message: "Please Select !" }]}
  >
    <Select
      size="large"
      placeholder="Preferred Mode of Communication"
      style={{ width: "100%" }}
      suffixIcon={<Arrow />}
      className="signup-select"
      popupClassName="custom-select-dropdown"
      onChange={(e) => setCommunicationMode(e)}
    >
      <Option value="whatsapp">
        <SmallWhatsAppIcon /> WhatsApp{" "}
      </Option>
      <Option value="telegram">
        <Telegram /> Telegram
      </Option>
      <Option value="skype">
        <Skype /> Skype
      </Option>
    </Select>
  </Form.Item>
);

const WhatsAppPhoneNumber = ({ whatsappPhone, setWhatsappPhone }) => {
  const handleContactChange = (ob) => {
    const onlyNumber = ob.value
      .replace(/[^0-9]+/g, "")
      .slice(ob.extraVal?.dialCode.length || 0);
    setWhatsappPhone({
      number: onlyNumber,
      prefix_1: ob.extraVal.dialCode || "",
    });
  };

  return (
    <Form.Item
      className="phone-relative"
      name="whatsapp_phone"
      rules={[
        {
          required: true,
          message: `Please input your  WhatsApp number !`,
        },
        {
          min: whatsappPhone.prefix_1 === "91" ? 12 : 7,
          message: `Please enter your WhatsApp number !`,
        },
      ]}
    >
      <PhoneInput
        autoFormat={true}
        disableSearchIcon
        inputProps={{
          name: "phone",
          required: true,
          placeholder: null,
        }}
        placeholder="Enter your WhatsApp number "
        onChange={(val, extra) =>
          handleContactChange({ value: val, extraVal: extra })
        }
        enableSearch={true}
        country={"in"}
      />
    </Form.Item>
  );
};

const WinningProductCheckbox = () => (
  <Form.Item
    className="winning-checkbox"
    name="winning_product_checked"
    valuePropName="checked"
  >
    <Checkbox>
      I’d like to receive winning products <p className="hidden md:inline-block">& eCommerce insights </p>on
      <SmallWhatsAppIcon />
      WhatsApp
    </Checkbox>
  </Form.Item>
);
const PrivacyCheckbox = () => (
  <Form.Item
    name="privacy_policy_checked"
    valuePropName="checked"
    className="privacy-checkbox-container "
    rules={[
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(
                new Error(
                  "You must accept the User Agreement  & Privacy Policy !"
                )
              ),
      },
    ]}
  >
    <Checkbox>
      I agree to the{" "}
      <a href="https://vfulfill.io/legals/user-agreement/" target="_blank">
        User Agreement
      </a>{" "}
      and{" "}
      <a href="https://www.vfulfill.io/legals/privacy" target="_blank">
        Privacy Policy
      </a>
    </Checkbox>
  </Form.Item>
);
const SubmitBtn = ({ authError, signupError, loading }) => (
  <Form.Item>
    {authError && <Alert message={authError} type="error" />}
    {signupError && <Alert message={signupError} type="error" />}

    <Button
      className="submit-btn"
      style={{ width: "100%" }}
      loading={loading}
      type="primary"
      htmlType="submit"
    >
      Sign Up
    </Button>
  </Form.Item>
);
const SubmitBtnContactDetail = ({ loading }) => (
  <Form.Item>
    <Button
      className="submit-btn"
      style={{ width: "100%" }}
      loading={loading}
      type="primary"
      htmlType="submit"
    >
      Complete Sign Up
    </Button>
  </Form.Item>
);
const LoginLine = ({ navigate }) => (
  <div className="sign-in-wr">
    <p>Already have an account?</p>
    <span onClick={() => navigate("/login")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          id="person_FILL0_wght300_GRAD0_opsz24"
          d="M188-764.643a3.55,3.55,0,0,1-2.637-1.125,3.739,3.739,0,0,1-1.1-2.706,3.738,3.738,0,0,1,1.1-2.706A3.549,3.549,0,0,1,188-772.306a3.549,3.549,0,0,1,2.637,1.126,3.739,3.739,0,0,1,1.1,2.706,3.739,3.739,0,0,1-1.1,2.706A3.55,3.55,0,0,1,188-764.643Zm-8,8.337v-2.434a2.77,2.77,0,0,1,.426-1.489,2.868,2.868,0,0,1,1.137-1.054,15.213,15.213,0,0,1,3.191-1.194,13.471,13.471,0,0,1,3.246-.4,13.47,13.47,0,0,1,3.246.4,15.213,15.213,0,0,1,3.191,1.194,2.868,2.868,0,0,1,1.137,1.054A2.77,2.77,0,0,1,196-758.74v2.434Zm1.6-1.642h12.8v-.792a1.092,1.092,0,0,0-.188-.616,1.434,1.434,0,0,0-.51-.462,13.489,13.489,0,0,0-2.811-1.056,11.853,11.853,0,0,0-2.891-.359,11.853,11.853,0,0,0-2.891.359,13.489,13.489,0,0,0-2.811,1.056,1.434,1.434,0,0,0-.51.462,1.092,1.092,0,0,0-.188.616Zm6.4-8.337a2.028,2.028,0,0,0,1.507-.643,2.136,2.136,0,0,0,.627-1.546,2.136,2.136,0,0,0-.627-1.546,2.028,2.028,0,0,0-1.507-.643,2.028,2.028,0,0,0-1.507.643,2.136,2.136,0,0,0-.627,1.546,2.136,2.136,0,0,0,.627,1.546A2.028,2.028,0,0,0,188-766.285ZM188-768.474ZM188-757.948Z"
          transform="translate(-180.001 772.306)"
          fill="#6450d3"
        />
      </svg>
      Sign In
    </span>
  </div>
);

const SkypeInput = ({ setSignupData, signupData }) => (
  <Form.Item
    label="Skype ID"
    name="skype_id"
    rules={[
      { required: true, message: "Please enter your Skype ID !" },
      {
        type: "email",
        message: "Please enter a valid Skype ID !",
      },
    ]}
  >
    <Input
      onChange={(e) => setSignupData({ email: e.target.value })}
      autoComplete="username"
      value={signupData?.email}
    />
  </Form.Item>
);

// Wrap components with AnimatedWrapper and specify delay
export const AnimatedFullName = LeftToRightAnimation(FullName, 0.2);
export const AnimatedMobileNumber = LeftToRightAnimation(MobileNumber, 0.3);
export const AnimatedEmail = LeftToRightAnimation(Email, 0.4);
export const AnimatedSkypeInput = LeftToRightAnimation(SkypeInput, 0.1);
export const AnimatedPassword = LeftToRightAnimation(Password, 0.5);
export const AnimatedInvitationCodeSwitch = LeftToRightAnimation(
  InvitationCodeSwitch,
  0.6
);
export const AnimatedWhatsAppDifferentSwitch = LeftToRightAnimation(
  WhatsAppDifferentSwitch,
  0.6
);
export const AnimatedInvitationCodeInput = LeftToRightAnimation(
  InvitationCodeInput,
  0.1
);
export const AnimatedModeOfCommunication = LeftToRightAnimation(
  ModeOfCommunication,
  0.7
);
export const AnimatedWhatsAppPhoneNumber = LeftToRightAnimation(
  WhatsAppPhoneNumber,
  0.1
);
export const AnimatedWinningProductCheckbox = LeftToRightAnimation(
  WinningProductCheckbox,
  0.9
);
export const AnimatedPrivacyCheckbox = LeftToRightAnimation(PrivacyCheckbox, 1);
export const AnimatedSubmitBtn = LeftToRightAnimation(SubmitBtn, 1);
export const AnimatedSubmitBtnContactDetail = LeftToRightAnimation(
  SubmitBtnContactDetail,
  1.1
);
export const AnimatedLoginLine = LeftToRightAnimation(LoginLine, 1.2);
