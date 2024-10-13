import { Checkbox } from "antd";
import { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
export const OrderDetailTitle = () => {
  const { currentPage, currentTab, setCurrentTab, orders, setOrders } =
    useContext(OrdersContext);

  const selectedOrders = orders?.filter((order) => order.selected);

  const handleCheckboxChange = (e, obj) => {
    setOrders(
      orders.map((order) => {
        order.selected = e.target.checked;
        order.line_items.forEach((item) => (item.selected = e.target.checked));
        return order;
      })
    );
  };

  return (
    <div className="order-detail-heading-container">
      <span>
        <Checkbox
          indeterminate={
            selectedOrders &&
            selectedOrders.length > 0 &&
            selectedOrders.length < orders.length
          }
          checked={
            selectedOrders &&
            selectedOrders.length !== 0 &&
            selectedOrders.length === orders.length
          }
          onChange={(e) => handleCheckboxChange(e, orders)}
        />
      </span>
      <span>Order Details</span>
    </div>
  );
};
