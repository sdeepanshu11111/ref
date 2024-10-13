import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CrossIcon } from "../../../../assets/Icons/CrossIcon";
import { ExternalLinkIcon } from "../../../../assets/Icons/ExternalLinkIcon";
import { ShopifyStoreIcon } from "../../../../assets/Icons/ShopifyStoreIcon";
import { WooCommerceIcon } from "../../../../assets/Icons/WooCommerceIcon";
import "./index.scss";
export const SelectStoreType = ({ onClose, setCurrentScreen }) => {
  const user = useSelector((state) => state?.auth?.auth?.user);

  return (
    <div className="select-store-type-container">
      <div className="heading">
        {user?.user_fname},  connect your store to get started.
      </div>
      {/* <div className="info-bar">
        Unlock <span className="foc">5 Innercircle Products </span>when you
        complete!
      </div> */}
      <div className="buttons-container">
        <Button
          className="store-type-btn-tile shopify-btn"
          onClick={() => {
            setCurrentScreen("shopify");
          }}
        >
          <div>
            <ShopifyStoreIcon />
          </div>

          <div className="label">Link Shopify Store</div>
        </Button>
        <Button
          className="store-type-btn-tile woocommerse-btn"
          onClick={() => {
            setCurrentScreen("woocommerce");
          }}
        >
          <div>
            <WooCommerceIcon />
          </div>

          <div className="label">Link WooCommerce Store</div>
        </Button>
      </div>
      <div className="footer">
        <div>
          <div className="footerdata">
            Don’t have a store? {" "}
            <a href="https://track.vcommission.com/click?campaign_id=10218&pub_id=102048" target="_blank">
            <span className="text">Launch store on Shopify</span> 
              <Button
                type="text"
                className="external-link"
                icon={<ExternalLinkIcon />}
              />
            </a>
          </div>
          <div className="footerdata">(Starting only @ ₹20/month) </div>
        </div>
      </div>
      <div className="crossiconContainer">
        <Button
          type="text"
          className="external-link"
          icon={<CrossIcon />}
          onClick={onClose}
        />
      </div>
    </div>
  );
};
