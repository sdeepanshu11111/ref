import React, { useContext } from "react";
import BreadCrumb from "./BreadCrumb";
import Tabs from "./Tabs";
import OrdersContext from "../NDRContext";
import "./index.scss";

const OrdersNav = () => {
  const { currentPage, currentTab, setCurrentTab, selectedStoreIds } =
    useContext(OrdersContext);

  return (
    <div className="orders-nav">
      <BreadCrumb />
      {<Tabs selectedStoreIds={selectedStoreIds} />}
    </div>
  );
};
export default OrdersNav;
