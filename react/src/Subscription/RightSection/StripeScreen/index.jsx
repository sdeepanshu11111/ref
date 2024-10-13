import React, { useState, useEffect } from "react";
import { Skeleton, Button, message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./index.scss";

const CheckoutForm = ({ clientSecretKey, setSubmit, planName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // analytics.track("Plan Payment Clicked");
    setPaymentLoading(true);
    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setPaymentLoading(false);
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecretKey,
      confirmParams: {
        return_url: `https://${window.top.location.host}/switch-store`,
      },
      redirect: "if_required",
    });

    await stripe
      .retrievePaymentIntent(clientSecretKey)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            analytics.track("Payment Succeeded");
            // analytics.track("Plan Subscribe " + `${planName}`);
            setSubmit(true);
            break;
          case "processing":
            message.info("Your payment is processing.");

            break;
          case "requires_payment_method":
            break;
          default:
            break;
        }
      });

    if (error) {
      setPaymentLoading(false);
      setErrorMessage(error.message);
      message.error(error.message, 5);
      analytics.track("Payment Failed " + error.code);
    }
  };

  return (
    <>
      <div id="fade-in" className="stripe-screen-wraper">
        <div className="stripe-card-wraper">
          {!stripe ? (
            <Skeleton />
          ) : (
            <div className="payment-element-wraper">
              <div
                className="plan-name-heading"
                style={{ textAlign: "left", marginBottom: "6px" }}
              >
                Your Payment Details:{" "}
              </div>
              <div className="payment-element">
                <PaymentElement />

                <div className="btn-wraper">
                  <Button
                    loading={paymentLoading}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Continue with Payment
                  </Button>
                </div>
              </div>

              {errorMessage && <div className="error">{errorMessage}</div>}

              <div className="secure">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.967"
                  height="22"
                  viewBox="0 0 16.967 22"
                >
                  <path
                    id="lock_FILL1_wght200_GRAD200_opsz48"
                    d="M186.967-841a1.894,1.894,0,0,1-1.39-.577,1.894,1.894,0,0,1-.577-1.39v-10.649a1.886,1.886,0,0,1,.577-1.4,1.908,1.908,0,0,1,1.39-.568h1.646V-858.1a4.733,4.733,0,0,1,1.419-3.481A4.7,4.7,0,0,1,193.484-863a4.7,4.7,0,0,1,3.453,1.419,4.735,4.735,0,0,1,1.418,3.481v2.518H200a1.908,1.908,0,0,1,1.39.568,1.886,1.886,0,0,1,.577,1.4v10.649a1.894,1.894,0,0,1-.577,1.39A1.894,1.894,0,0,1,200-841Zm6.524-5.378a1.809,1.809,0,0,0,1.328-.55,1.8,1.8,0,0,0,.55-1.324,1.843,1.843,0,0,0-.557-1.322,1.794,1.794,0,0,0-1.335-.574,1.768,1.768,0,0,0-1.328.576,1.88,1.88,0,0,0-.55,1.338,1.769,1.769,0,0,0,.557,1.308A1.839,1.839,0,0,0,193.491-846.378Zm-3.62-9.2H197.1V-858.1a3.524,3.524,0,0,0-1.053-2.582,3.472,3.472,0,0,0-2.558-1.06,3.476,3.476,0,0,0-2.559,1.06,3.522,3.522,0,0,0-1.055,2.582Z"
                    transform="translate(-185 863)"
                    fill="#898989"
                  />
                </svg>
                Guaranteed safe & secure checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const StripeScreen = ({
  clientSecretKey,
  stripe_channel,
  setSubmit,
  planName,
}) => {
  const options = {
    clientSecret: clientSecretKey,
  };

  const stripePromise = loadStripe(
    stripe_channel === "stripe_uk"
      ? import.meta.env.VITE_REACT_STRIPE_KEY
      : import.meta.env.VITE_REACT_STRIPE_KEY_US
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        setSubmit={setSubmit}
        planName={planName}
        clientSecretKey={clientSecretKey}
      />
    </Elements>
  );
};

export default StripeScreen;
