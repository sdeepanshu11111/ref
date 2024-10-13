import React, { useContext } from "react";
import { Select } from "antd";
import OrdersContext from "../../NDRContext";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import ArrowIcon from "../../../../assets/Icons/Arrow";
import "./index.scss";
import { options } from "./constants";
import { defaultTab } from "../../constants";

const BreadCrumb = () => {
  const { currentPage, setCurrentPage, setCurrentTab } =
    useContext(OrdersContext);

  return (
    <div className="bread-crumb">
      <motion.div
        className="left"
        initial={{ opacity: 0, x: -50 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
        exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            id="shopping_cart_FILL0_wght300_GRAD0_opsz24"
            d="M64.82-854a1.459,1.459,0,0,1-1.056-.423,1.379,1.379,0,0,1-.435-1.027,1.379,1.379,0,0,1,.435-1.027,1.459,1.459,0,0,1,1.056-.423,1.459,1.459,0,0,1,1.056.423,1.379,1.379,0,0,1,.435,1.027,1.379,1.379,0,0,1-.435,1.027A1.459,1.459,0,0,1,64.82-854Zm8.26,0a1.459,1.459,0,0,1-1.056-.423,1.379,1.379,0,0,1-.435-1.027,1.379,1.379,0,0,1,.435-1.027,1.459,1.459,0,0,1,1.056-.423,1.459,1.459,0,0,1,1.056.423,1.379,1.379,0,0,1,.435,1.027,1.379,1.379,0,0,1-.435,1.027A1.459,1.459,0,0,1,73.08-854Zm-9.231-13.1,2.16,4.4h5.81a.242.242,0,0,0,.131-.036.317.317,0,0,0,.1-.1l2.286-4.04a.146.146,0,0,0,.008-.155.15.15,0,0,0-.139-.068Zm-.613-1.243H75.07a.872.872,0,0,1,.791.433.829.829,0,0,1,.025.884l-2.73,4.81a1.518,1.518,0,0,1-.555.559,1.481,1.481,0,0,1-.756.2H65.626l-.987,1.753a.184.184,0,0,0,0,.207.2.2,0,0,0,.184.112h9.752v1.243H64.82a1.4,1.4,0,0,1-1.281-.715,1.336,1.336,0,0,1-.03-1.427l1.216-2.126-3.1-6.346H60V-870h2.426l.81,1.657Zm2.773,5.641h0Z"
            transform="translate(-60.001 869.999)"
            fill="#848484"
          />
        </svg>
        <h1>NDR</h1>
    
      </motion.div>

  
    </div>
  );
};
export default BreadCrumb;
