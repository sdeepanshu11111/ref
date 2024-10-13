import { Button, Checkbox, Input } from "antd";
import React, { useContext } from "react";
import { EditproductIcon, MinusIcon, PlusIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import { BundleSection } from "./BundleSection";
import "./index.scss";
import { useState, useEffect } from "react";

const LineItem = ({ item, updateQuantity }) => {
  const [initialQuantity, setInitialQuantity] = useState(item.quantity);

  useEffect(() => {
    setInitialQuantity(item.quantity);
  }, []);

  const inputOnChangeHandler = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 0 && newQuantity <= initialQuantity) {
      updateQuantity(item.lineitem_id, newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (item.quantity > 0) {
      updateQuantity(item.lineitem_id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (item.quantity < initialQuantity) {
      updateQuantity(item.lineitem_id, item.quantity + 1);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-detail-section-container">
        <div className="item  ">
          <div className="image-container">
            <img src={item.img} />
          </div>
        </div>
        <div className="item details-section">
          <div className="product-name-container">{item.name}</div>
          <div className="specs-container"> Specs: {item.allspecs}</div>
          {item.vfsku !== "BUNDLE" ? (
            <div className="item">{item.vfsku}</div>
          ) : null}
        </div>
        <div className="item quantity">
          <div className="quantity-btn">
            <Button
              disabled={item.quantity === 1}
              onClick={decreaseQuantity}
              className="left-btn"
              bordered
              icon={<MinusIcon />}
            />
            <Input
              value={item.quantity}
              onChange={inputOnChangeHandler}
              defaultValue={item.quantity}
            />
            <Button
              disabled={item.quantity === initialQuantity}
              onClick={increaseQuantity}
              className="right-btn"
              icon={<PlusIcon />}
            />
          </div>
          pcs
        </div>
      </div>

      {item.vfsku == "BUNDLE" ? <BundleSection product={item} /> : null}
    </div>
  );
};

export const EditQuantityModal = ({ onClose }) => {
  const { modal, setOrders, orders } = useContext(OrdersContext);

  const [data, setData] = useState(modal?.data);

  const updateQuantity = (lineitem_id, quantity) => {
    const updatedData = {
      ...data,
      line_items: data.line_items.map((item) =>
        item.lineitem_id === lineitem_id ? { ...item, quantity } : item
      ),
    };

    setData(updatedData);
  };

  const saveEditedQuantity = () => {
    setOrders(() => {
      return orders.map((order) =>
        order._id.$oid === modal.data._id.$oid
          ? { ...order, line_items: [...data.line_items] }
          : order
      );
    });
    onClose();
  };

  return (
    <div className="orderpageEditproduct-modal">
      <HeaderSection
        onClose={onClose}
        headingText="Edit Quantity"
        headerIcon={<EditproductIcon />}
      />

      <OrderInfo obj={modal?.data} />
      <div className="detail-heading">
        <div className="item-1">Product Details</div>{" "}
        <div className="item-2">Quantity</div>
      </div>
      {data?.line_items?.map((item, key) => {
        return (
          <LineItem updateQuantity={updateQuantity} key={key} item={item} />
        );
      })}
      <div className="footer-container">
        <Button
          onClick={saveEditedQuantity}
          type="primary"
          className="submit-btn"
        >
          <span className="icon-container">
            <EditproductIcon />
          </span>{" "}
          Save Edited Quantity
        </Button>
      </div>
    </div>
  );
};
