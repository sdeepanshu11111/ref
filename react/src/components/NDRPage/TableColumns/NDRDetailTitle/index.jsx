import { Checkbox } from "antd";
import { useContext } from "react";
import OrdersContext from "../../NDRContext";
import "./index.scss";
export const NDRDetailTitle = () => {
  const { currentPage, currentTab, setCurrentTab, orders, setOrders } =
    useContext(OrdersContext);

  const selectedOrders = orders?.filter((order) => order.selected);

  const handleCheckboxChange = (e, obj) => {
    setOrders(
      orders.map((order) => {
        order.selected = e.target.checked;
        order?.items.forEach((item) => (item.selected = e.target.checked));
        return order;
      })
    );
  };

  return (
    <div className="ndr-detail-heading-container">
      {currentTab == "pending" && (
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
      )}

      <span>Shipment Details</span>
    </div>
  );
};
