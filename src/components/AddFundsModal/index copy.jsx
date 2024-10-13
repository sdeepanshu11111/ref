import React, { useState, useEffect, useCallback } from "react";
import { Modal, message, Input, Button, Radio, Tabs, Tooltip } from "antd";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { formatNumber, getCurrencySymbol } from "../../helpers/Pricing";
import WireTransferSuccessOutSideIndiaModal from "./WireTransferNRI";
import "./index.scss";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

const AddFundsModal = ({ open, toggleAddFundsModal, inrValue = 1 }) => {
  // State declarations
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [amountToAdd, setAmountToAdd] = useState(5000);
  const [feeMultiplier, setFeeMultiplier] = useState(0.035);
  const [feeFixed, setFeeFixed] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cc");
  const [razorpay, setRazorpay] = useState({ orderid: "", amount: 0 });
  const [successModal, setSuccessModal] = useState({ visible: false, id: "" });
  const [wireSuccessModal, setWireSuccessModal] = useState({
    visible: false,
    id: "",
  });
  const [wireSuccessModalNRI, setWireSuccessModalNRI] = useState({
    visible: false,
    id: "",
  });
  const [currencyData, setCurrencyData] = useState({
    base: null,
    payment_gateway_fees: null,
    total: null,
  });
  const [stripePayment, setStripePayment] = useState({
    visible: false,
    clientSecretKey: "",
    amount: 0,
    amount_inr: 0,
  });

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setPaymentType("INR");
  }, []);
  useEffect(() => {
    if (paymentType === "INR") {
      setAmountToAdd(5000);
    } else {
      setAmountToAdd(100);
    }
  }, [paymentType]);

  useEffect(() => {
    if (paymentType === "INR") {
    } else {
      inrToDollar(amountToAdd);
    }
  }, [amountToAdd]);

  // Handle tab change
  const tabChangeHandler = (e) => {
    setPaymentType(e);
  };

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);

    const options = {
      key: "YOUR_KEY_ID",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: 1212,

      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  // Generate Razorpay Order
  const generateRazorpayOrder = () => {
    axios
      .post(
        import.meta.env.VITE_REACT_API_URL +
          "/payments/generate_razorpay_order",
        {
          amount: amountToAdd,
          currency: paymentType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === 1) {
          if (paymentType === "USD") {
            setStripePayment({
              clientSecretKey: res.data.client_secret,
              visible: true,
              amount: res.data.amount,
              amount_inr: res.data.amount_inr,
            });
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
              handler: (response) => handleRazorpayResponse(response),
              prefill: {
                name: auth?.auth?.user?.user_fname,
                email: auth?.auth?.user?.user_email,
              },
              theme: {
                color: "#72A0FF",
              },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();

            // const rzp1 = new window.Razorpay(options);
          }
        } else {
          message.error(res.data.msg);
        }
      })
      .catch((e) => {
        message.error("There was an error!");
      });
  };

  // Handle Razorpay Response
  const handleRazorpayResponse = (response) => {
    axios
      .post(
        import.meta.env.VITE_REACT_API_URL +
          "/payments/razorpay_payment_response",
        {
          response,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === 1) {
          alert();
          setSuccessModal({ visible: true });
        } else {
          setFailedModal({ visible: true });
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  // Generate Wire Order
  const generateWireOrder = () => {
    axios
      .post(
        import.meta.env.VITE_REACT_API_URL +
          "/payments/generate_wiretransfer_order",
        {
          amount: amountToAdd,
          currency: paymentType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === 1) {
          if (paymentType === "USD") {
            setWireSuccessModalNRI({ visible: true, id: res.data.orderid });
          } else {
            setWireSuccessModal({ visible: true, id: res.data.orderid });
          }
        } else {
          setFailedModal({
            visible: true,
            text: res.data.msg || "There was an error!",
          });
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  // Convert INR to Dollar
  const inrToDollar = (amount) => {
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_REACT_API_URL + "/payments/currency_converter",
        {
          amount: amount,
          currency: paymentType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success === 1) {
          setCurrencyData(res.data.inr);
        } else {
          message.info(res.data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.message);
      });
  };

  // Toggle Transaction Success Modal
  const toggleTransactionSuccessModal = () => {
    if (paymentMethod === "cc") {
      setSuccessModal((prev) => ({ ...prev, visible: !prev.visible }));
    } else if (paymentMethod === "wire") {
      setWireSuccessModal((prev) => ({ ...prev, visible: !prev.visible }));
    }
  };

  // Toggle Failed Modal
  const toggleFailedModal = () => {
    setFailedModal((prev) => ({ ...prev, visible: !prev.visible, text: null }));
  };

  // Change Payment Method
  const changeMethod = (value) => {
    let feeMultiplier = 0;
    let feeFixed = 0;
    if (value === "cc") {
      feeMultiplier = 0.035;
    } else if (value === "paypal") {
      feeMultiplier = 0.044;
      feeFixed = 0.3 * inrValue;
    }
    setPaymentMethod(value);
    setFeeMultiplier(feeMultiplier);
    setFeeFixed(feeFixed);
  };

  // Set Amount
  const setAmount = (n) => {
    setAmountToAdd(n);
    if (paymentType === "USD") {
      inrToDollar(n);
    }
  };

  // Continue with Payment
  const continueWithPayment = () => {
    if (paymentMethod === "cc") {
      generateRazorpayOrder();
    } else if (paymentMethod === "wire") {
      generateWireOrder();
    }
  };

  // Footer Handler
  const footerHandler = () => {
    if (stripePayment.clientSecretKey) {
      return null;
    }

    const minAmount = paymentType === "INR" ? 5000 : 100;
    const isDisabled = loading || amountToAdd < minAmount;

    return (
      <Button block disabled={isDisabled} onClick={continueWithPayment}>
        CONTINUE WITH PAYMENT
      </Button>
    );
  };

  return (
    <div className="AddFundsModal">
      <Modal
        className="AddFundsModal__main"
        open={true}
        onCancel={toggleAddFundsModal}
        centered
        destroyOnClose
        footer={footerHandler()}
      >
        <div className="AddFundsModal__left">
          <div className="AddFundsModal__left__header">
            <h2>Add funds to your account</h2>
            <p>
              To continue creating orders, you need to add funds to your
              account. Minimum <br /> add funds value should be{" "}
              {getCurrencySymbol(paymentType)}{" "}
              {paymentType === "INR" ? 5000 : 100}
            </p>
          </div>
          <Tabs
            defaultActiveKey="INR"
            onChange={tabChangeHandler}
            activeKey={paymentType}
          >
            <TabPane tab="₹ INR" key="INR">
              <div className="AddFundsModal__amount">
                <h3>Add Amount</h3>
                <Tooltip
                  placement="top"
                  title="Minimum add funds value should be 5000"
                >
                  <Input
                    type="number"
                    prefix="₹"
                    value={amountToAdd}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </Tooltip>
              </div>
            </TabPane>
            <TabPane tab="$ USD" key="USD">
              <div className="AddFundsModal__amount">
                <h3>Add Amount</h3>
                <Tooltip
                  placement="top"
                  title="Minimum add funds value should be 100"
                >
                  <Input
                    type="number"
                    prefix="$"
                    value={amountToAdd}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </Tooltip>
                <div>
                  <Button
                    type="link"
                    loading={loading}
                    onClick={() => inrToDollar(amountToAdd)}
                  >
                    Convert to ₹ INR
                  </Button>
                </div>
                {currencyData?.total && (
                  <p style={{ margin: "5px 0" }}>
                    <strong>
                      {getCurrencySymbol(paymentType)} {amountToAdd}
                    </strong>{" "}
                    = ₹ {formatNumber(currencyData?.total)}
                  </p>
                )}
              </div>
            </TabPane>
          </Tabs>
          <div className="AddFundsModal__options">
            <h3>Select Payment Method</h3>
            <Radio.Group
              onChange={(e) => changeMethod(e.target.value)}
              value={paymentMethod}
            >
              <Radio value="cc">Credit/Debit Card</Radio>
              <Radio value="wire">Wire Transfer</Radio>
            </Radio.Group>
          </div>
        </div>

        <WireTransferSuccessOutSideIndiaModal
          hideFooter={false}
          id={wireSuccessModalNRI.id}
          open={wireSuccessModalNRI.visible}
          toggleSuccessModal={() =>
            setWireSuccessModalNRI({ visible: false, id: "" })
          }
        />
      </Modal>
    </div>
  );
};

export default AddFundsModal;
