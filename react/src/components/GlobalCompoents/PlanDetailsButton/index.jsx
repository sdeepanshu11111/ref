import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "./index.scss";
import { Flex } from "antd";

const PlanDetailsButton = () => {
  const auth = useSelector((state) => state.auth);

  const storeId = auth?.auth?.store?.id;
  const planName = auth?.auth?.plan?.current_plan?.plan_name;
  const getFormattedPlanName = (name) => {
    const firstWord = name?.split(" ")[0];
    return firstWord === "Earthquaker" ? "Earth Quaker" : firstWord;
  };

  return (
    <motion.button
      onClick={() =>
        window.location.assign(
          import.meta.env.VITE_REACT_OLD_APP_URL +
            `/switch-store/${storeId}?redirect=profile?plan`
        )
      }
      className="custom-button manage-subscription-topbar"
      whileHover={{ width: "225px" }}
      whileTap={{ scale: 0.9 }}
    >
      <h4>Manage My Subscription</h4>

      <div vertical align="start" className="plan-name">
        <span>Current Plan</span>
        <p>{getFormattedPlanName(planName)}</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <circle
          id="Ellipse_175"
          data-name="Ellipse 175"
          cx="16"
          cy="16"
          r="16"
          fill="#e28930"
        />
        <path
          id="azm_24dp_FILL1_wght300_GRAD0_opsz24"
          d="M104.067-766.339l4.013-4.013V-780H98.432l-4.013,4.014h9.648ZM97.728-760l4.014-4.013v-9.648H92.094l-4.014,4.013h9.648Z"
          transform="translate(-84.08 787)"
          fill="#fafafa"
        />
      </svg>
    </motion.button>
  );
};

export default PlanDetailsButton;
