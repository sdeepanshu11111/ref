import React, { useState, useEffect } from "react";
import { message, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import WalletIcon from "../../../assets/Icons/Wallet";
import useWindowDimensions from "../../../CustomHooks/useWindowDimensions";
import { useSelector } from "react-redux";
import "./index.scss";

const WalletAmount = ({ props, showSmall }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const auth = useSelector((state) => state?.auth);
  const { width } = useWindowDimensions();

  const balanceFetcher = () => {
    setLoading(true);

    axios({
      url: import.meta.env.VITE_REACT_API_URL + `/wallet/get_current_balance`,
      method: "post",
      data: {
        currency: auth?.auth?.store?.store_geo === "global" ? "USD" : "INR",
      },
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.success === 1) {
          setBalance(
            res.data.balance
              ? "₹ " + res.data.balance.toLocaleString("en-IN")
              : 0
          );
        } else {
          message.error(res.data.msg);
        }
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  };

  const kFormatter = (num) => {
    // Remove commas and rupee symbol
    const cleanedNum = num.toString().replace(/[,₹]/g, "");

    const parsedNum = parseFloat(cleanedNum);

    if (isNaN(parsedNum)) {
      return "Invalid Number"; // Handle cases where the input is not a valid number
    }

    if (Math.abs(parsedNum) > 99999) {
      return (
        Math.sign(parsedNum) * (Math.abs(parsedNum) / 100000).toFixed(1) + "L"
      );
    } else if (Math.abs(parsedNum) > 999) {
      return (
        Math.sign(parsedNum) * (Math.abs(parsedNum) / 1000).toFixed(1) + "K"
      );
    } else {
      return Math.sign(parsedNum) * Math.abs(parsedNum);
    }
  };
  useEffect(() => {
    balanceFetcher();
  }, []);

  if (loading) {
    return (
      <div className="wallet-wrapper">
        <Spin active />
      </div>
    );
  }

  if (width < 768) {
    return (
      <motion.div
        onClick={() =>
          window.location.assign(
            import.meta.env.VITE_REACT_OLD_APP_URL +
              `/switch-store/${auth?.auth?.store?.id}?redirect=${auth?.auth?.store?.store_geo}/my-wallet`
          )
        }
        className="wallet-wrapper"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WalletIcon />
        <span> {kFormatter(balance)}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={() =>
        window.location.assign(
          import.meta.env.VITE_REACT_OLD_APP_URL +
            `/switch-store/${auth?.auth?.store?.id}?redirect=${auth?.auth?.store?.store_geo}/my-wallet`
        )
      }
      className="wallet-wrapper"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WalletIcon />
      <span>{balance}</span>
    </motion.div>
  );
};

export default WalletAmount;
