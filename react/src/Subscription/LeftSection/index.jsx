import React from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import { TickIcon } from "./Icons";
import LogoBlack from "../../assets/Icons/VflogoFullBlack";
import TrustPilotLogo from "../../assets/Icons/TrustPilotLogo";
import ShopifyStarLogo from "../../assets/Icons/ShopifyStarLogo";
import BoyPic from "./boy.png";
import CheckoutType from "./checkoutType.png";
import "./index.scss";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const LeftSection = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="subscription-left-screen"
    >
      <div className="container">
        <motion.div
          style={{ marginBottom: "6px" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LogoBlack />
        </motion.div>

        {/* <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          You’re one step away from growing your eCommerce business in India.
        </motion.h1> */}

        {/* <Row
          justify="center"
          align="middle"
          gutter={[6, 6]}
          className="icon-wraper"
        >
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <TrustPilotLogo />
            </motion.div>
          </Col>
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <ShopifyStarLogo />
            </motion.div>
          </Col>
        </Row> */}

        <motion.div
          className="list-container"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {["Winning Products", "Sourcing & Branding"].map(
            (item, index) => (
              <motion.div className="pointer" variants={fadeInUp} key={index}>
                <TickIcon /> {item}
              </motion.div>
            )
          )}
        </motion.div>

        <motion.div
          className="list-container"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {["Managed Operations", "Risk Free Trial"].map((item, index) => (
            <motion.div className="pointer" variants={fadeInUp} key={index}>
              <TickIcon /> {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="boy-img"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >
        <img style={{ marginBottom: "32px" }} src={BoyPic} alt="" />

        <img src={CheckoutType} alt="" />
      </motion.div>
    </motion.div>
  );
};

export default LeftSection;
