import React from "react";
import { motion } from "framer-motion";

const LeftToRightAnimation = (Component, delay=0) => (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <Component {...props} />
    </motion.div>
  );
};

export default LeftToRightAnimation;
