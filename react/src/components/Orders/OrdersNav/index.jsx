import React, { useContext } from "react";
import BreadCrumb from "./BreadCrumb";
import Tabs from "./Tabs";
import OrdersContext from "../OrdersContext";
import "./index.scss";

const OrdersNav = () => {
  const { currentPage, currentTab, setCurrentTab } = useContext(OrdersContext);

  return (
    <div className="orders-nav">
      <BreadCrumb />
      {currentPage !== "ordersSummary" &&  <Tabs />}
    </div>
  );
};
export default OrdersNav;
