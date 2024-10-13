import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  message,
  Input,
  Button,
  Radio,
  Tabs,
  Tooltip,
  Select,
  Flex,
} from "antd";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { formatNumber, getCurrencySymbol } from "../../helpers/Pricing";
import WireTransferSuccessOutSideIndiaModal from "./WireTransferNRI";
import { LoadingOutlined } from "@ant-design/icons";
import StripeScreen from "../../Subscription/RightSection/StripeScreen";
import WireIcon from "../../assets/wire.png";
import VisaIcon from "../../assets/visa.png";
import WireTransferSuccessModal from "./WireTransfer";
import Arrow from "../../assets/Icons/Arrow";
import "./index.scss";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const AddFundsModal = ({
  open,
  toggleAddFundsModal,
  onCancel,
  amount,
  subheading,
  title,
}) => {
  const MIN_INR_AMOUNT = !!amount ? amount : 5000;
  const MIN_USD_AMOUNT = 100;

  const [state, setState] = useState({
    loading: false,

    paymentType: "INR",
    amountToAdd: MIN_INR_AMOUNT,
    feeMultiplier: 0.035,
    feeFixed: 0,
    paymentMethod: "cc",
    razorpay: { orderid: "", amount: 0 },
    successModal: { visible: false, id: "" },
    wireSuccessModal: { visible: false, id: "" },
    wireSuccessModalNRI: { visible: false, id: "" },
    currencyData: {
      inr: { base: null, payement_gateway_fees: null, total: null },
      usd: { base: null, payement_gateway_fees: null, total: null },
    },
    stripePayment: {
      visible: false,
      clientSecretKey: "",
      amount: 0,
      amount_inr: 0,
    },
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    inrToDollar(state.amountToAdd);

    setState((prev) => ({
      ...prev,
      stripePayment: {
        visible: false,
        clientSecretKey: "",
        amount: 0,
        amount_inr: 0,
      },
    }));
  }, [state.paymentType]);

  const generateRazorpayOrder = () => {
    setBtnLoading(true);
    var amount = state.amountToAdd;
    if(state.paymentType=="USD"){
      amount = state.currencyData.usd.base;
    }
    axios
      .post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }/payments/generate_razorpay_order`,
        {
          amount: amount,
          currency: state.paymentType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setBtnLoading(false);
        if (res.data.success === 1) {
          if (state.paymentType === "USD") {
            setState((prev) => ({
              ...prev,
              stripePayment: {
                clientSecretKey: res.data.client_secret,
                visible: true,
                amount: res.data.amount,
                amount_inr: res.data.amount_inr,
              },
            }));
          } else {
            const options = {
              key: "",
              amount: res.data.amount,
              currency: "INR",
              name: "vFulfill",
              description: "Add Funds",
              image:
                "https://vfulfill.io/assets/images/blackBackgroundVfulfillLogo.png",
              order_id: res.data.orderid,
              handler: handleRazorpayResponse,
              prefill: {
                name: auth?.auth?.user?.user_fname,
                email: auth?.auth?.user?.user_email,
                contact: auth?.auth?.user?.user_phone?.number,
              },
              theme: { color: "#72A0FF" },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
          }
        } else {
          message.error(res.data.msg);
        }
      })
      .catch(() => {
        setBtnLoading(false);
        message.error("There was an error!");
      });
  };

  const handleRazorpayResponse = (response) => {
    setBtnLoading(true);
    axios
      .post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }/payments/razorpay_payment_response`,
        {
          response,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setBtnLoading(false);
        if (res.data.success === 1) {
          message.success("Success" || res.data.msg);

          setTimeout(() => onCancel(), 500);

          setState((prev) => ({ ...prev, successModal: { visible: true } }));
        } else {
          toggleFailedModal();
        }
      })
      .catch((e) => {
        setBtnLoading(false);
        message.error(e.message);
      });
  };

  const generateWireOrder = () => {
    axios
      .post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }/payments/generate_wiretransfer_order`,
        {
          amount: state.amountToAdd,
          currency: state.paymentType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === 1) {
          if (state.paymentType === "USD") {
            setState((prev) => ({
              ...prev,
              wireSuccessModalNRI: { visible: true, id: res.data.orderid },
            }));
          } else {
            setState((prev) => ({
              ...prev,
              wireSuccessModal: { visible: true, id: res.data.orderid },
            }));
          }
        } else {
          toggleFailedModal(res.data.msg || "There was an error!");
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const inrToDollar = useCallback(
    (amount) => {
      setState((prev) => ({ ...prev, loading: true }));
      axios
        .post(
          `${import.meta.env.VITE_REACT_API_URL}/payments/currency_converter`,
          {
            amount: amount,
            currency: "INR",
          },
          { withCredentials: true }
        )
        .then((res) => {
          setState((prev) => ({
            ...prev,
            loading: false,
            currencyData: res.data.success === 1 ? res.data : null,
          }));
          if (res.data.success !== 1) message.info(res.data.msg);
        })
        .catch((err) => {
          setState((prev) => ({ ...prev, loading: false }));
          message.error(err.message);
        });
    },
    [state.paymentType]
  );

  const toggleFailedModal = (text = null) => {
    setState((prev) => ({
      ...prev,
      failedModal: { visible: !prev.failedModal.visible, text },
    }));
  };

  const changeMethod = (value) => {
    let feeMultiplier = 0;
    let feeFixed = 0;
    if (value === "cc") {
      feeMultiplier = 0.035;
    }
    setState((prev) => ({
      ...prev,
      paymentMethod: value,
      feeMultiplier,
      feeFixed,
    }));
  };

  const setAmount = (n) => {
    setState((prev) => ({ ...prev, amountToAdd: n }));
    // if (state.paymentType === "USD") {
    inrToDollar(n);
    // }
  };

  const fieldGen = (name, field) => {
    if (field === "total" && state.paymentMethod === "wire") {
      return (
        <Flex className="fund-field">
          <div className="title">{name} </div>
          <Flex className="amount">
            {state.loading ? (
              <LoadingOutlined />
            ) : (
              <>
                <p className="inr">
                  {" "}
                  ₹{" "}
                  {String(
                    state.currencyData.inr.base?.toLocaleString("en-IN")
                  )}{" "}
                </p>
                {state.paymentType === "USD" && (
                  <p className="usd">
                    ({getCurrencySymbol("USD")} {state.currencyData.usd.base})
                  </p>
                )}
              </>
            )}
          </Flex>
        </Flex>
      );
    }

    if (field === "payement_gateway_fees" && state.paymentMethod === "wire") {
      return (
        <Flex className="fund-field">
          <div className="title">{name} </div>
          <Flex className="amount">
            {state.loading ? (
              <LoadingOutlined />
            ) : (
              <>
                <p className="inr"> ₹ 0 </p>
                {state.paymentType === "USD" && (
                  <p className="usd">({getCurrencySymbol("USD")} 0)</p>
                )}
              </>
            )}
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex className="fund-field">
        <div className="title">{name} </div>
        <Flex className="amount">
          {state.loading ? (
            <LoadingOutlined />
          ) : (
            <>
              <p className="inr">
                ₹ {state.currencyData.inr[field]?.toLocaleString("en-IN")}{" "}
              </p>
              {state.paymentType === "USD" && (
                <p className="usd">
                  ({getCurrencySymbol("USD")} {state.currencyData.usd[field]})
                </p>
              )}
            </>
          )}
        </Flex>
      </Flex>
    );
  };

  const continueWithPayment = () => {
    if (state.paymentMethod === "cc") {
      generateRazorpayOrder();
    } else if (state.paymentMethod === "wire") {
      generateWireOrder();
    }
  };

  const footerHandler = () => {
    if (state.stripePayment.clientSecretKey) {
      return null;
    }

    const minAmount =
      state.paymentType === "INR" ? MIN_INR_AMOUNT : MIN_USD_AMOUNT;
    const isDisabled = state.loading || state.amountToAdd < minAmount;

    return (
      <Tooltip
        placement="top"
        title={
          isDisabled
            ? `Minimum add funds value should be ${MIN_INR_AMOUNT}`
            : null
        }
      >
        <Button
          type="primary"
          block
          loading={btnLoading}
          disabled={isDisabled}
          onClick={continueWithPayment}
        >
          CONTINUE WITH PAYMENT
        </Button>
      </Tooltip>
    );
  };

  return (
    <div className="AddFundsModal">
      <Modal
        className="AddFundsModal__main"
        open={open}
        centered
        onCancel={() => onCancel()}
        title={
          <div className="fund-modal-header">
            {!subheading && <h1>Add Funds</h1>}

            {!!subheading ? subheading : <h2>To your vFulfill wallet</h2>}
          </div>
        }
        destroyOnClose
        footer={footerHandler()}
      >
        <div className="AddFundsModal__amount">
          <Tooltip
            placement="top"
            title={`Minimum add funds value should be ${MIN_INR_AMOUNT}`}
          >
            <Input
              type="number"
              prefix="₹"
              size="large"
              placeholder="Enter Amount"
              value={state.amountToAdd}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </Tooltip>
        </div>

        <Select
          size="large"
          suffixIcon={<Arrow />}
          style={{ width: "100%" }}
          value={state.paymentType}
          onChange={(e) => setState((prev) => ({ ...prev, paymentType: e }))}
          options={[
            {
              value: "INR",
              label: "Pay in ₹ INR (Recommended for Indians)",
            },
            {
              value: "USD",
              label: "Pay in $ USD (Recommended for Non-Indians)",
            },
          ]}
        />

        <div className="fund-field-wraper">
          {fieldGen("Amount: ", "base")}
          {fieldGen("Payment Gateway Fee: ", "payement_gateway_fees")}
          {fieldGen("Total Amount: ", "total")}
        </div>

        <div className="payment-method-heading">Select Payment Method</div>

        <Flex
          onClick={() => changeMethod("wire")}
          justify="space-between"
          align="center"
          className={`payment-option ${
            state.paymentMethod === "wire" ? "payment-selected" : ""
          }`}
        >
          <Radio checked={state.paymentMethod === "wire"}>
            <Flex gap={15} justify="start" align="center" className="left">
              <img width={40} height={32} src={WireIcon} alt="" />

              <div>
                <p>Wire Transfer (0% Fee)</p>
                <span>(Credit in 1-2 business days)</span>
              </div>
            </Flex>
          </Radio>
        </Flex>

        <Flex
          onClick={() => changeMethod("cc")}
          justify="space-between"
          align="center"
          className={`payment-option  ${
            state.paymentMethod === "cc" ? "payment-selected" : ""
          }`}
        >
          <Radio checked={state.paymentMethod === "cc"}>
            <Flex className="left">
              <img width={40} height={32} src={VisaIcon} alt="" />

              <div>
                <p>Credit Card (3.5% Fee)</p>
                <span>(Instant Credit)</span>
              </div>
            </Flex>
          </Radio>
        </Flex>

        <WireTransferSuccessOutSideIndiaModal
          hideFooter={false}
          id={state.wireSuccessModalNRI.id}
          open={state.wireSuccessModalNRI.visible}
          toggleSuccessModal={() =>
            setState((prev) => ({
              ...prev,
              wireSuccessModalNRI: { visible: false, id: "" },
            }))
          }
        />
        <WireTransferSuccessModal
          hideFooter={false}
          id={state.wireSuccessModal.id}
          open={state.wireSuccessModal.visible}
          toggleSuccessModal={() =>
            setState((prev) => ({
              ...prev,
              wireSuccessModal: { visible: false, id: "" },
            }))
          }
        />

        {!!state.stripePayment.clientSecretKey && !state.loading && (
          <Modal
            onCancel={() =>
              setState((prev) => ({
                ...prev,
                stripePayment: {
                  visible: false,
                  clientSecretKey: "",
                  amount: 0,
                  amount_inr: 0,
                },
              }))
            }
            footer={null}
            open
          >
            <StripeScreen
              stripe_channel={"stripe_us"}
              setSubmit={() => {
                message.success("Success");
                setTimeout(() => onCancel(), 1000);
              }}
              clientSecretKey={state.stripePayment.clientSecretKey}
            />
          </Modal>
        )}
      </Modal>
    </div>
  );
};

export default AddFundsModal;
