// import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";
// import qs from "qs";
import analytics from "../../analytics";
// import VfulfillLogo from "../../assets/Icons/Vflogo";
import { bindActionCreators } from "redux";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Alert,
  message,
  Radio,
  Spin,
} from "antd";
const { Search } = Input;
import { Actions } from "../../store";
import "./index.scss";
// import { Editiicon } from "../../assets/Icons/Editiicon";
import { VFulfillIcon } from "../../assets/Icons/VFulfillIcon";
let inputCss = {
  border: "1px solid #EAEAEA !important",
  borderRadius: "4px",
  width: "72px",
  height: "72px",
  backgroundColor: "#f5f5f5",
  fontSize: "18px",
  color: "#000",
  fontWeight: "400",
  caretColor: "blue",
};
let errorCss = {
  border: "1px solid #B23333 !important",
  borderRadius: "4px",
  width: "72px",
  height: "72px",
  backgroundColor: "#F8F0F0",
  fontSize: "18px",
  color: "#000",
  fontWeight: "400",
  caretColor: "blue",
};

const OtpForm = (props) => {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { authError } = auth;

  const dispatch = useDispatch();
  const { signIn, loadingTrue, removeError } = bindActionCreators(
    Actions,
    dispatch
  );

  const [state, setState] = useState({
    loading: false,
    editError: false,
    loadingVerification: false,
    loadingedit: false,
    email: props?.signupData?.email,
    myinterval: 0,
    edit: false,
  });
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const handleChange = (code) => {
    setCode(code);
  };
  const updateEmail = () => {
    setState((prev) => ({ ...prev, editError: false }));

    if (
      state.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setState((prev) => ({ ...prev, loadingedit: true }));

      axios({
        url: import.meta.env.VITE_REACT_API_URL + "/user/update_email_address",
        method: "post",
        data: {
          email: state.email,
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.success === 1) {
            props.setSignupData((prev) => ({ ...prev, email: state.email }));
            setState((prev) => ({ ...prev, edit: false, loadingedit: false }));
            message.success("Email updated successfully.");
            setCode("");
            setTimeLeft(30);
            setIsRunning(true);
          } else {
            message.error(res.data.msg);
            setState((prev) => ({ ...prev, loadingedit: false }));
          }
        })
        .catch((e) => {
          message.error(e.message);
          setState((prev) => ({ ...prev, loadingedit: false }));
        });
    } else {
      setState((prev) => ({ ...prev, editError: true }));
      message.error("Please enter valid email!");
    }
  };

  const handleChangeWhiteSpace = (e) => {
    if (e.clipboardData.getData("Text").trim().replaceAll(" ", "").length < 7) {
      setCode(e.clipboardData.getData("Text").trim().replaceAll(" ", ""));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1) {
            clearInterval(intervalId);
            setIsRunning(false);
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, props.activeComp]);

  // mount
  useEffect(() => {
    setState((prev) => ({ ...prev, email: props.signupData.email }));
  }, [state.edit, props.activeComp]);

  // mount
  //   useEffect(() => {
  //     if (auth.auth.logged_in) {
  //       return navigate("/switch-store");
  //     }
  //   });

  // otp resend
  const resendOtp = (event) => {
    event.preventDefault();

    setState((prev) => ({ ...prev, loading: true }));

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/user/generate_otp_email",
      method: "post",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          setState((prev) => ({ ...prev, loading: false }));
          message.success(res.data.msg);

          setTimeLeft(30);
          setIsRunning(true);
        } else {
          message.error(res.data.msg);
        }
      })
      .catch((e) => {
        setState((prev) => ({ ...prev, loading: false }));
        message.error(e.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.innerWidth < 800) {
      analytics.track("Mobile-OTP Verification Clicked");
    } else {
      analytics.track("OTP Verification Clicked");
    }

    // analytics.track("OTP VerificationClicked");

    setState((prev) => ({ ...prev, loadingVerification: true }));
    setError(false);
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/user/verify_otp_email",
      method: "post",
      data: {
        location: "main",
        email: {
          user_email: state.email,
          otp: parseInt(code),
        },
      },
      withCredentials: true,
    })
      .then((res) => {
        setState((prev) => ({ ...prev, loadingVerification: false }));

        if (res.data.success) {
          analytics.track("OTP Verification Success");
          // if (auth?.auth?.steps?.PLAN !== true) {
          //   return navigate("/switch-store");
          // }

          signIn({
            email: state.email,
            password: props.signupData.password,
          });

          // props.setActiveComp("question");
          // loadingTrue();
        } else {
          message.error(res.data.msg);
          setError(true);
          if (window.innerWidth < 800) {
            analytics.track("Mobile-OTP Failed");
          } else {
            analytics.track("OTP Failed");
          }
        }
      })
      .catch((err) => {
        if (window.innerWidth < 800) {
          analytics.track("Mobile-OTP Error");
        } else {
          analytics.track("OTP API Error");
        }

        message.error(err.message);
        setState((prev) => ({ ...prev, loadingVerification: false }));
      });
  };
  let emailVerify = code?.length == "4";

  useEffect(() => {
    document.title = "vFulfill | OTP";
    if (auth?.auth?.logged_in) {
      return navigate("/signup-questionairre");
    }
  }, [auth]);

  return (
    <div id="fade-in" className="form-wapper-login otp-form-container">
      {" "}
      <div className="heading-bar">
        <div className="heading-icon-container">
          <VFulfillIcon />
        </div>

        <div>
          {state.edit ? (
            <div className="edit-section-container">
              <div className="welcome-heading">Update your email address</div>
              <div className="info-email">Change email address to:</div>

              <Input
                className="input-edit-email"
                value={state.email}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <div className="btn-container">
                <Button
                  disabled={!state.email}
                  type="primary"
                  loading={state.loadingedit}
                  className={
                    state.email
                      ? "submit-btn"
                      : "submit-btn submit-btn-disabled"
                  }
                  onClick={() => {
                    state.email ? updateEmail() : null;
                  }}
                >
                  Update Email Address
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="welcome-heading">Verify your email address</div>
              <div className="info-email">
                We sent a code to <span>{props.signupData.email}</span>{" "}
              </div>
              <div>
                <div>
                  {/* <Input.OTP length={4} onChange={handleChange} value={code} /> */}
                  <div
                    className={
                      error
                        ? "witherror new-otp-verify otp-form"
                        : "new-otp-verify otp-form"
                    }
                  >
                    {error && (
                      <div className="errorheading">
                        {" "}
                        Please enter the correct code
                      </div>
                    )}
                    {/* <div className="heading"> Enter the OTP below</div> */}
                    <OtpInput
                      value={code}
                      onChange={handleChange}
                      numInputs={4}
                      inputType={"number"}
                      separator={<span style={{ width: "8px" }}></span>}
                      pattern="\d*"
                      isInputNum={true}
                      onPaste={handleChangeWhiteSpace}
                      shouldAutoFocus={true}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={!error ? inputCss : errorCss}
                      focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
                <div>
                  {state.loading ? (
                    <Spin size="small" />
                  ) : (
                    <div
                      className={
                        timeLeft === 0
                          ? "resend-code resend-code-time0"
                          : "resend-code"
                      }
                    >
                      <span>
                        <button
                          className={
                            timeLeft == 0 ? "resend" : "disableresend resend"
                          }
                          loading={state.loading}
                          onClick={(e) => resendOtp(e)}
                          disabled={timeLeft !== 0 ? true : false}
                        >
                          Resend {timeLeft !== 0 && "code in"}
                        </button>
                      </span>
                      {timeLeft === 0 ? null : (
                        <span className="time-container">
                          {" "}
                          {timeLeft < 10 ? `00:0${timeLeft}` : "00:" + timeLeft}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="btn-container">
                  <Button
                    // className="submit-btn"
                    disabled={!emailVerify}
                    type="primary"
                    onClick={(e) => handleSubmit(e)}
                    loading={state.loadingVerification}
                    className={
                      emailVerify
                        ? "submit-btn"
                        : "submit-btn submit-btn-disabled"
                    }
                  >
                    Verify Email Address
                  </Button>
                </div>
                <Button
                  type="text"
                  className="edit-btn"
                  onClick={(prev) =>
                    setState({
                      ...prev,
                      edit: true,
                    })
                  }
                >
                  Change email address
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OtpForm;
