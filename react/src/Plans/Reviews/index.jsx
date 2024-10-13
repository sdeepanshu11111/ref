import React, { useState } from "react";
import { motion } from "framer-motion";
import { Collapse, Flex } from "antd";
import pic1 from "./hardikpic.png";
import pic2 from "./simon.png";
import Stars from "../../assets/Icons/Stars";
import GreenArrow from "../../assets/Icons/GreenBorderedArrow";
import "./index.scss"; // Create and import a CSS file for styling

const Reviews = ({}) => {
  const onChange = (key) => {};
  return (
    <div className="review-wraper">
      <div className="review">
        <h1>
          “vFulfill is hands-down everything you need to run your eCommerce
          business in India. We started to use them to manage our drop-shipping
          business and in under 6 months, they helped us scale several winners
          and also start a D2C brand on a couple of those products. They hold
          good expertise in sourcing right quality products, managing branded
          packaging & handling logistics.”
        </h1>

        <div className="stars">
          <Stars />
          <p>Recommended 5/5.</p>
        </div>

        <Flex gap={16} align="center" justify="center">
          <div className="img-wraper">
            <img src={pic1} alt="" />
          </div>

          <div className="right-text">
            <h2>Hardik Bhatia</h2>
            <h3>Internet eCompreneur & CEO at Koozo India</h3>
            <h4>
              <span>
                <GreenArrow />
              </span>{" "}
              $1.7M + in &lt; 1 year
            </h4>
          </div>
        </Flex>
      </div>

      <div className="review">
        <h1>
          “No one better than vFulfill could help me launch my products in
          India. India has dream CPAs with a large audience base. I shared a few
          products with vFulfill that I was marketing in other countries and
          they helped me choose the relevant ones for India. It scaled crazy and
          vFulfill managed it all for me. Best part was vFulfill paid me in my
          home country & I didn’t even have to have a local presence to run my
          eCommerce in India. ”
        </h1>

        <div className="stars">
          <Stars />
          <p>Recommended 5/5.</p>
        </div>

        <Flex gap={16} align="center" justify="center">
          <div className="img-wraper">
            <img src={pic2} alt="" />
          </div>

          <div className="right-text">
            <h2>Simon</h2>
            <h3>Internet eCompreneur</h3>
            <h4>
              <span>
                <GreenArrow />
              </span>{" "}
              $2.2M + in &lt; 1 year
            </h4>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Reviews;
