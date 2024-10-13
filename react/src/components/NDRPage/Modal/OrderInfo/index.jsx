import React from "react";
import { CODIcon, PrepaidIcon, StoreIcon } from "../../Icons";
import "./index.scss";

export const OrderInfo = ({ obj = {} }) => {
  return (
    <div className="ndr-orderInfoContainerModal">
      <div className="awb-row">
        <span className="heading">AWB: </span>
        <span className="value">{obj?.awb}</span>{" "}
      </div>
      <div className="first-row-container">
        <div className="item item-1">
          {" "}
          <span className="label">Order Details:</span>{" "}
          <a href="#" className="link">
            {obj?.order_vfid}
          </a>
        </div>
        <div className="item item-2">
          {" "}
          <span className="payment-icon-container">
            {obj?.is_cod ? <CODIcon /> : <PrepaidIcon />}
          </span>{" "}
          <span className="type">{obj?.is_cod ? "COD" : "Prepaid"}</span>{" "}
          <span className="divider"></span>
          <span className="amount">
            ₹{" "}
            {obj?.total_order_cost?.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <div className="sec-row-container">
        <div className="item item-1">
          {" "}
          <span className="label">Store Order:</span>{" "}
          <span className="s-o">{obj?.order_shopify_name}</span>
        </div>
        <div className="item item-2">
          {" "}
          <span className="payment-icon-container">
            <StoreIcon />
          </span>
          <span className="store-name">{obj?.storename}</span>
        </div>
      </div>
    </div>
  );
};
