import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { ExtenalLink, ShopifyIcon, WooCommerce } from "../../Icons";
import { AddStoreModal } from "../../../GlobalCompoents/AddStoreModal";
import "./index.scss";

export const ConnectBottomBar = () => {
  const [addStoreData, setaddStoreData] = useState({
    open: false,
  });
  const handleClick = (page) => {
    setaddStoreData((pre) => {
      return {
        ...pre,
        open: true,
        page: page,
      };
    });
  };

  return (
    <div className="card-connect-bottom">
      <div className="first-row">
        <Button type="primary" className="submit-btn" onClick={handleClick.bind(this,"shopify")}>
          <span className="icon-container">
            <ShopifyIcon />
          </span>
          Link Shopify
        </Button>
      </div>
      <div className="sec-row">
        <a
          href="https://track.vcommission.com/click?campaign_id=10218&pub_id=102048"
          target="_blank"
        >
          <Button type="" className="woo-btn">
            Or, Launch a new Store on Shopify
            <span className="icon-container">
              <ExtenalLink />
            </span>
          </Button>
        </a>
      </div>
      <div className="third-row">
        <div className="price-detail">(Starting only @ ₹20/month)</div>

        <div className="woolink" onClick={handleClick.bind(this,"woocommerce")}>
          Link your WooCommerce Store
        </div>
      </div>
      {addStoreData.open && (
        <AddStoreModal
          open={addStoreData.open}
          page={addStoreData.page}
          onClose={() => setaddStoreData((pre) => ({  open: false, page:"" }))}
        />
      )}
    </div>
  );
};
