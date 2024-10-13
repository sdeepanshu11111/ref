import React, { useEffect, useState } from "react";
import {
  Form,
  Radio,
  Button,
  Typography,
  Modal,
  Flex,
  message,
  Divider,
  Skeleton,
} from "antd";
import { motion } from "framer-motion";
import { RazorpayIcon, StripeIcon } from "./Icons";
import "./index.scss";
import getClientSecret from "../API/getClientSecret";
import StripeScreen from "./StripeScreen";
import CompleteSubscription from "./AppSubscriptionComplete";
import Logo from "../../assets/Icons/VflogoFull";
import getPlans from "../API/getPlans";
import PlanChooseOption from "./PlanChooseOption";
import { LeftArrowGrey } from "../../assets/Icons/LeftArrowGrey";
import ChangeChooseOption from "./ChangeChooseOption";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const division = {
  quarterly: 4,
  annually: 12,
  monthly: 1,
};

const SubscriptionForm = ({
  trial,
  plan_id,
  monthly,
  yearly,
  quarterly,
  plan_name,
  changeplan,
  amount,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [subscription, setSubscription] = useState("");
  const [routeSubscription, setRouteSubscription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [clientSecretKey, setClientSecretKey] = useState("");
  const [planId, setPlanId] = useState(plan_id);
  const [plansData, setPlansData] = useState({});

  const getPlanHandler = async () => {
    try {
      setLoading(true);
      const { data } = await getPlans();
      setPlansData(data);
    } catch (error) {
      // message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = (planType) => {
    const plan = plansData[subscription.toLowerCase()]?.find((plan) =>
      plan.plan_displayname.toLowerCase().includes(planType?.toLowerCase())
    );

    if (plan) {
      setPlanId(plan.plan_id);
    }
  };

  const handleSubmit = () => {};

  const clientSecretKeyHandler = async (planID, changeplan) => {
    setLoading(true);

    let apiPayload = {};

    if (changeplan) {
      apiPayload = {
        plan_id: planID,
      };
    } else {
      apiPayload = {
        plan_id: planID,
        trial: !!trial ? 1 : 0,
      };
    }

    try {
      const res = await getClientSecret(apiPayload, changeplan);

      setClientSecretKey(res?.client_secret);
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (monthly) {
      setRouteSubscription("monthly");
      setSubscription("monthly");
    }

    if (quarterly) {
      setRouteSubscription("quarterly");
      setSubscription("quarterly");
    }

    if (yearly) {
      setRouteSubscription("yearly");
      setSubscription("yearly");
    }
  }, [monthly, yearly, quarterly]);

  useEffect(() => {
    setClientSecretKey("");
    handleSubscription(plan_name);
  }, [subscription]);

  useEffect(() => {
    clientSecretKeyHandler(planId, changeplan);
  }, [planId]);

  useEffect(() => {
    getPlanHandler();
  }, []);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="subscription-form-container"
      >
        <Form
          className="subscription-form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <motion.div className="logo" variants={itemVariants}>
            <Logo />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Flex className="heading" align="center" justify="space-between">
              <h1> Enter Your Payment Details</h1>{" "}
              <span onClick={() => navigate(-1)}>
                {" "}
                <LeftArrowGrey /> More Pricing Options
              </span>{" "}
            </Flex>
          </motion.div>

          <Divider />
          <motion.div variants={itemVariants}>
            <Form.Item
              className="subscription-type"
              label={
                <div className="plan-name-heading">
                  Your current choice:{" "}
                  <span
                    style={{ textTransform: "capitalize", fontSize: "24px" }}
                  >
                    {plan_name}
                    {" | "}
                    Billed {subscription}
                  </span>
                </div>
              }
            >
              {changeplan ? (
                <ChangeChooseOption
                  amount={amount}
                  initialPlan={routeSubscription}
                  choosedPlan={subscription}
                  changePlan={setSubscription}
                  plan_name={plan_name}
                  plansData={plansData}
                />
              ) : (
                <PlanChooseOption
                  subscription={subscription}
                  plan_name={plan_name}
                  plansData={plansData}
                  initialPlan={routeSubscription}
                  choosedPlan={subscription}
                  changePlan={setSubscription}
                />
              )}
            </Form.Item>
          </motion.div>

          {!!loading || !clientSecretKey ? <Skeleton active /> : null}

          {!!clientSecretKey && !loading && (
            <motion.div variants={itemVariants}>
              <StripeScreen
                stripe_channel={plansData?.stripe_channel}
                setSubmit={setSubmit}
                setClientSecretKey={setClientSecretKey}
                clientSecretKey={clientSecretKey}
              />
            </motion.div>
          )}
        </Form>
      </motion.div>

      {!!submit && (
        <Modal
          // onCancel={() => setClientSecretKey("")}
          footer={null}
          open={true}
          closable={false}
        >
          <CompleteSubscription />
        </Modal>
      )}
    </>
  );
};

export default SubscriptionForm;
