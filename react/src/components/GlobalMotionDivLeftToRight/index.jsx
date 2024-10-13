import React from "react";
import { motion } from "framer-motion";
export const MotionLeft = ({ children,delay=0, element, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, delay: delay }}
       { ...value }

    >
      {children}
    </motion.div>
  );
};
