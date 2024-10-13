import React from "react";
import "./index.scss";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import GlobalDatePicker from "../../../GlobalCompoents/GlobalDatePicker";

export const OrderSummaryHeaderBar = ({ dateRange, setDateRange }) => {
  return (
    <div className="orderSummarypage-header-bar">
      {" "}
      <motion.div
        className="left"
        initial={{ opacity: 0, x: -50 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
        exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="heading">Orders Summary</div>
      </motion.div>
      <motion.div
        className="left"
        initial={{ opacity: 0, x: +500 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
        exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <GlobalDatePicker
          showText={true}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </motion.div>
    </div>
  );
};
