import { Button, Checkbox, Input, message } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";

const LineItem = ({ item, updateQuantity, lineItemCheckboxHandler }) => {
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
        <div className="item checkbox-section">
          <Checkbox
            onChange={(e) => lineItemCheckboxHandler(e, item.lineitem_id)}
            checked={item?.selected}
          />
        </div>
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
export const ReviewLineitemEscalation = ({ onClose }) => {
  const { modal, setModal } = useContext(OrdersContext);
  const [data, setData] = useState({
    ...modal?.data,
    items: [
      ...modal?.data?.items.map((item) => {
        return { ...item, selected: 0 };
      }),
    ],
  });
  const updateQuantity = (lineitem_id, quantity) => {
    const updatedData = {
      ...data,
      items: data.items.map((item) =>
        item.lineitem_id === lineitem_id ? { ...item, quantity } : item
      ),
    };

    setData(updatedData);
  };
  const lineItemCheckboxHandler = (e, lineitem_id) => {
    const updatedData = {
      ...data,
      items: data.items.map((item) =>
        item.lineitem_id === lineitem_id
          ? { ...item, selected: e.target.checked }
          : item
      ),
    };

    setData(updatedData);
  };
  const handleClick = () => {
    if (data?.items.some((item) => item.selected)) {
      setModal({
        open: true,
        currentModal: "escalationRequest",
        data: {
          obj: modal?.data,
          items: data.items.filter((item)=>item.selected),
        },
      });
    }else{
        message.error("Please select atleast one of the following line-item")
    }
  };
  return (
    <div className="shipment-review-lineItem-modal-container">
      {" "}
      <HeaderSection onClose={onClose} headingText="Review Line Items" />
      <OrderInfo obj={modal.data} />
      <div className="detail-heading">
        <div className="item-1">Product Details</div>{" "}
        <div className="item-2">Quantity</div>
      </div>
      <div className="line-items-container">
        {data?.items?.map((item, key) => {
          return (
            <LineItem
              updateQuantity={updateQuantity}
              key={key}
              item={item}
              lineItemCheckboxHandler={lineItemCheckboxHandler}
            />
          );
        })}
      </div>
      <div className="footer-container">
        <Button type="primary" className="submit-btn" onClick={handleClick}>
          Continue
        </Button>
      </div>
    </div>
  );
};
