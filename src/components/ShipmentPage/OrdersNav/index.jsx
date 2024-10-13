import React, { useContext } from "react";
import BreadCrumb from "./BreadCrumb";
import Tabs from "./Tabs";
import OrdersContext from "../OrdersContext";
import "./index.scss";

const OrdersNav = () => {
  const { currentPage, currentTab, setCurrentTab, selectedStoreIds } =
    useContext(OrdersContext);

  return (
    <div className="shipment-nav">
      <BreadCrumb selectedStoreIds={selectedStoreIds} />
      <Tabs />
    </div>
  );
};
export default OrdersNav;
