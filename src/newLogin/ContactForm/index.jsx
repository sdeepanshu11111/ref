import { Button, Select, Form, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import PI from "react-phone-input-2";
import "./index.scss";
import "react-phone-input-2/lib/style.css";
import Arrow from "../../assets/Icons/Arrow";
import { WhatsappLogo } from "../../assets/Icons/WhatsappLogo";
import { TelegramIcon } from "../../assets/Icons/Telegram";
import { SkypeIcon } from "../../assets/Icons/Skype";
import { BoldArrow } from "../../assets/Icons/BoldArrow";
import axios from "axios";
const PhoneInput = PI.default ? PI.default : PI;

const connectWayObj = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  skype: "Skype",
};

const ContactForm = (props) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({ contactno: "", prefix_1: "" });
  const [submit, setSubmit] = useState(false);
  const [skypeID, setSkypeId] = useState("");
  const [loading, setLoading] = useState(false);

  const [connectWay, setConnectWay] = useState("whatsapp");

  const handleSubmit = () => {
    setLoading(true);
    let data;
    if (connectWay === "skype") {
      data = {
        skypeId: skypeID,
        connectWay: connectWay,
      };
    } else {
      data = {
        user_phone: {
          code: state.prefix_1,
          number: state.contactno,
        },
        connectWay: connectWay,
      };
    }

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/save_user_contact",
      method: "post",
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.success === 1) {
          // this.props.changeTab();

          analytics.track("Google contact details submitted");

          message.success(res.data.msg);

          setSubmit(true);
        } else {
          message.error(res.data.msg);
        }
      })
      .catch((e) => {
        message.error(e.message);
        setLoading(false);
      });
  };

  const handleContactChange = (ob) => {
    let onlyNumber = ob.value
      .replace(/[^0-9]+/g, "")
      .slice(
        !!Object.entries(ob.extraVal).length ? ob.extraVal.dialCode.length : 0
      );

    if (ob.value === 0 || ob.value === "") {
      setState({
        contactno: "",
        prefix_1: "",
      });
    } else if (parseInt(ob.value)) {
      setState({
        contactno: onlyNumber,
        prefix_1: ob.extraVal.dialCode,
      });
    }
  };
  const handleChangeID = (e) => {
    setSkypeId(e.target.value);
  };
  useEffect(() => {
    if (!props?.auth?.auth?.logged_in) {
      return navigate("/switch-store");
    }

    if (submit) {
      return props.navigate("/switch-store");
    }

    if (props.auth?.auth?.user?.user_phone !== "") {
      return props.navigate("/switch-store");
    }
  }, [submit, props.auth]);

  return (
    <div className="contact-form-container">
      <div className="heading-bar">
        <div className="welcome-heading">Your contact details</div>
        <div className="subheading">Help us get in touch.</div>
      </div>
      <div className="title">What’s the best way to connect with you?</div>
      <Select
        value={connectWay}
        rootClassName="connectWaySelect"
        style={{ width: "100%" }}
        suffixIcon={
          <span className="arrow-icon-container">
            <BoldArrow />
          </span>
        }
        onChange={(e) => {
          setConnectWay(e);
          form.setFieldValue("phone", "");
          form.setFieldValue("phone2", "");
          setState({ contactno: "", prefix_1: "" });
          setSkypeId("");
        }}
        options={[
          {
            value: "whatsapp",
            label: (
              <div className="labelconnectWaySelect">
                <span className="iconContainer">
                  <WhatsappLogo />{" "}
                </span>{" "}
                Whatsapp
              </div>
            ),
          },
          {
            value: "skype",
            label: (
              <div className="labelconnectWaySelect">
                {" "}
                <span className="iconContainer">
                  <SkypeIcon />{" "}
                </span>
                Skype
              </div>
            ),
          },
          {
            value: "telegram",
            label: (
              <div className="labelconnectWaySelect">
                {" "}
                <span className="iconContainer">
                  <TelegramIcon />{" "}
                </span>
                Telegram
              </div>
            ),
          },
        ]}
      />

      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError={true}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {connectWay === "skype" ? (
          <Form.Item
            id="phone2"
            className="phone-relative"
            label={`Your Skype id`}
            name="phone2"
            rules={[
              {
                required: true,
                message: "Please enter id",
              },
            ]}
          >
            <Input onChange={handleChangeID} />
          </Form.Item>
        ) : (
          <Form.Item
            id="phone"
            className="phone-relative"
            label={`Your ${connectWayObj[connectWay]}  phone number`}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },

              {
                min: state.prefix_1 == "91" ? 12 : 7,
                message: "Please enter your phone number!",
              },
            ]}
          >
            <PhoneInput
              autoFormat={true}
              disableSearchIcon
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
                placeholder: "Your WhatsApp Number",
              }}
              onChange={(val, extra) =>
                handleContactChange({
                  value: val,
                  extraVal: extra,
                  field: "contactno",
                })
              }
              enableSearch={true}
              country={"in"}
            />
          </Form.Item>
        )}

        <Form.Item style={{ marginBottom: "0" }}>
          <Button
            className="submit-btn"
            style={{ width: "100%" }}
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Continue {">>"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
