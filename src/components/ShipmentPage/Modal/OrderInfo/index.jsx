import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import { CODIcon, PrepaidIcon, StoreIcon } from "../../Icons";
import "./index.scss";

export const OrderInfo = ({ obj = {} }) => {
  const { auth } = useContext(OrdersContext);

  return (
    <div className="orderInfoContainerModal">
      <div className="awb-row">
        <h2>
          <span>AWB:</span> <span className="awb">{obj?.awb}</span>
        </h2>
      </div>
      <div className="first-row-container">
        <div className="item item-1">
          {" "}
          <span className="label">Order ID:</span>{" "}
          <span href="#" className="link">
            {obj?.order_vfid}
          </span>
        </div>
        <div className="item item-2">
          {" "}
          <span className="payment-icon-container">
            {obj?.is_cod ? <CODIcon /> : <PrepaidIcon />}
          </span>{" "}
          <span className="type">{obj?.is_cod ? "COD" : "Prepaid"}</span>{" "}
          <span className="divider"></span>
          <span className="amount">₹ {obj?.shipmentTotalAmount}</span>
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
          <span className="store-name"> {obj?.storename}</span>
        </div>
      </div>
    </div>
  );
};
