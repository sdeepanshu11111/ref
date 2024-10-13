import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Row, Col } from "antd";
import "./index.scss";
import {
  GoogleIcon,
  WhatsAppIcon,
  ShopifyIcon,
} from "../../../assets/Icons/GoogleIcon";
import WhatsAppLogin from "./WhatsAppLogin";

const ThirdPartyLogin = () => {
  const [showWhatsAppModal, setWhatsAppModal] = useState(false);

  const modalHandler = () => {
    setWhatsAppModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} // Initial animation properties
      animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
      exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="third-party-login">
        Sign up via
        <Row justify="center" align="middle" gutter={[20, 20]}>
          <Col>
            <motion.a
              className="signupbutton"
              href={`${import.meta.env.VITE_REACT_API_URL}/auth/googleLogin`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GoogleIcon />
            </motion.a>
          </Col>
          <Col>
            <motion.div
              style={{ cursor: "pointer", display: "flex" }}
              onClick={modalHandler}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <WhatsAppIcon />
            </motion.div>
          </Col>
          <Col>
            <motion.a
              className="signupbutton"
              href={
                "https://apps.shopify.com/vfulfill-cod-dropshipping/reviews?search_id=466e11b7-81ce-46f8-b591-5805ca63d3ba"
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShopifyIcon />
            </motion.a>
          </Col>
        </Row>
      </div>

      {showWhatsAppModal && (
        <WhatsAppLogin
          cancel={() => setWhatsAppModal(false)}
          open={showWhatsAppModal}
        />
      )}
    </motion.div>
  );
};

export default ThirdPartyLogin;
