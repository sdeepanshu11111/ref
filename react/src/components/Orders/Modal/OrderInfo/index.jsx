import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import { CODIcon, PrepaidIcon, StoreIcon } from "../../Icons";
import "./index.scss";

export const OrderInfo = ({ obj = {} }) => {
  const { auth } = useContext(OrdersContext);

  let currentStoreName =
    auth?.auth?.user?.user_stores[obj?.order_storeid?.$oid]?.store_name;

  return (
    <div className="orderInfoContainerModal">
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
          <span className="amount">₹ {obj?.total_order_value}</span>
        </div>
      </div>
      <div className="sec-row-container">
        <div className="item item-1">
          {" "}
          <span className="label">Store Order:</span>{" "}
          <span className="s-o">{obj?.order_shopify?.name}</span>
        </div>
        <div className="item item-2">
          {" "}
          <span className="payment-icon-container">
            <StoreIcon />
          </span>
          <span className="store-name">{currentStoreName}</span>
        </div>
      </div>
    </div>
  );
};
