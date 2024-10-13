import React, { useState } from "react";
import { motion } from "framer-motion";
import { Collapse } from "antd";
import Arrow from "../../assets/Icons/Arrow";
import "./index.scss"; // Create and import a CSS file for styling

const Faq = ({}) => {
  const items = [
    {
      key: "1",
      label: "WHAT IS VFULFILL?",
      children: (
        <p>
          vFulfill is all-in-one digital eCommerce platform that enables eCom
          entrepreneurs to start, optimize and scale their COD eCom business in
          India.
          <br></br>
          Our end-to-end solution takes care of all operational e-commerce
          aspects like sourcing, fulfillment, warehousing, shipping, COD
          remittances, call centre etc – enabling you to focus on marketing and
          scaling your business.
        </p>
      ),
    },
    {
      key: "2",
      label: "WHAT ARE THE OPERATIONAL HOURS",
      children: (
        <p>
          <li>
            Warehouses: 8 AM – 6 PM Local time (GMT +5:30), Open 6 days per week
          </li>
          <li>Delivery agent: 8AM – 9PM Local time</li>
          <li>Office : Monday – Friday 9AM – 6PM </li>
          <li>Queries : support@vfulfill.io</li>
        </p>
      ),
    },
    {
      key: "3",
      label: "WHO CAN WORK WITH VFULFILL?",
      children: (
        <p>
          <p>
            Anyone who knows marketing and aims to start or scale their eCom
            brand in India.
          </p>

          <p>Mostly our target audience includes:</p>

          <li>
            <b>Dropshippers,</b>wanting to explore India COD eCommerce for its
            low CPAs & huge scale or, have 1 partner manage all their
            operations.{" "}
          </li>

          <li>
            <b>Global D2C Brands,</b>wanting to leverage the large audience base
            in India / expand to India / launch more products in their D2C brand
            in India
          </li>

          <li>
            <b>Media Buyers / Affiliate Marketers,</b>wanting to launch their
            eCom brand in India
          </li>
          <li>
            <b>Performance Networks / Agencies,</b>wanting to set up & own a COD
            eCom offer in India
          </li>
        </p>
      ),
    },
    {
      key: "4",
      label: "HOW CAN I IMPORT PRODUCTS THROUGH VFULFILL",
      children: (
        <p>
          By accessing our app panel, you can view our catalog & request to
          source. Our sourcing specialist will respond to you within 24 hours.
        </p>
      ),
    },
    {
      key: "5",
      label:
        " DO WE NEED TO SIGN ANY LEGAL PAPERS OR DOCUMENTS AFTER SIGNUP WITH VFULFILL?",
      children: (
        <p>
          There is no requirement of signing any legal documents. You will only
          need to agree to our TnCs and fill your KYC to meet the compliances.
          You can also choose to close your account anytime, after clearing
          dues, if any, and also choose to request deletion of all of your data.
          We are GDPR compliant as well, in that aspect.
        </p>
      ),
    },
    {
      key: "6",
      label: "WHAT IS THE AVERAGE % ON ORDERS IN INDIA?",
      children: (
        <p>
          <p>Delivery percentage on:</p>

          <li>Prepaid orders varies from 95 to 99%.</li>
          <li>COD orders varies from 45 to 90%</li>

          <p>
            Please note that your delivery percentage is a function of several
            factors like:
          </p>

          <p>1. Perceived value of the product vs your selling price</p>
          <p>
            2. Positioning of your store (we recommend you set up a good theme
            on your store & make it look like a branded store)
          </p>
          <p>
            3. How strategically you’re calling your customers for orders
            confirmation or to manage delivery attempts and much more…
          </p>
          <p>
            4. Needless to mention, we help you optimize everything, because of
            which average delivery percentage on COD orders at vFulfill stand at
            a minimum of 60% in the most cases.
          </p>
        </p>
      ),
    },
    {
      key: "7",
      label: "WHAT ALL PLATFORMS CAN WE USE IN INDIA FOR PROMOTION?",
      children: (
        <p>
          <p>
            You can choose to run your paid marketing campaigns on (in the order
            of priority & the most used):
          </p>

          <p>1. Facebook</p>
          <p>2. Instagram</p>
          <p>3. Native (Taboola, Outbrain, MGID, etc.)</p>
          <p>4. Google Ads – Search, Shopping, GDN & Youtube</p>
          <p>Snapchat</p>

          <i>
            *Please note Tiktok is banned in India right now, hence, you cannot
            advertise on Tiktok to target Indian user base.{" "}
          </i>
        </p>
      ),
    },
    {
      key: "8",
      label: "I DO NOT HAVE A COMPANY IN INDIA. CAN I USE VFULFILL?",
      children: (
        <p>
          Yes, you can use vFulfill, even if you are not a registered business
          in India. vFulfill has unique partnerships to manage taxation on your
          behalf and can give out payouts to you in your home country after
          deducting the taxes, as per compliance.{" "}
        </p>
      ),
    },
  ];

  const onChange = (key) => {};
  return (
    <div className="faq-wraper">
      <h1>Frequently Asked Questions</h1>

      <Collapse
        expandIcon={() => <Arrow />}
        expandIconPosition="end"
        items={items}
        // defaultActiveKey={["1"]}
        onChange={onChange}
      />
      {/* <div className="more">More FAQs &gt; </div> */}
    </div>
  );
};

export default Faq;
