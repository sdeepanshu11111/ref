import { Button, Checkbox, Input, message } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { raiseShipmentDisputeAction } from "../../Apis/raiseShipmentDisputeAction";
import { MinusIcon, PlusIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";
import { RefundSection } from "./RefundSection";
import { ReplaceSection } from "./ReplaceSection";
import { RequestActionContainer } from "./RequestActionContainer";
import { ReversePickUpSection } from "./Reversepickup";
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
export const RequestActions = ({ onClose }) => {
  const { modal } = useContext(OrdersContext);
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({
    ...modal?.data.obj,
    items: [
      ...modal?.data?.obj?.items.map((item) => {
        return { ...item, selected: 1 };
      }),
    ],
  });

  const [requestCheckbox, setRequestCheckbox] = useState({
    ...modal.data.requestCheckbox,
  });
  const [refundInfo, setRefundInfo] = useState({
    customer_name: "",
    acc_no: "",
    confirm_acc_no: "",
    ifsc_code: "",
    amount: modal?.data?.obj?.shipmentTotalAmount.toString(),
  });
  const [rvpReason, setRvpReason] = useState();
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
  const redirectFunction = (id, type) => {
    window.location.assign(
      import.meta.env.VITE_REACT_OLD_APP_URL +
        `/switch-store/${auth?.auth?.store?.id}?redirect=` +
        auth?.auth?.store?.store_geo +
        `/` +
        auth?.auth?.store?.id +
        `/requests/shipment-requests?search=${id}#${type}`,
      "_blank"
    );
  };
  const handleSubmit = async () => {
    if (!data.items.some((item) => item.selected)) {
      message.error("Please select at least one item");
      return;
    }

    if (data?.request_status?.rvp == 0 && requestCheckbox.rvp && !rvpReason) {
      message.error("Please select reason for Reverse Pickup");
      return;
    }
    if (data?.request_status?.refund == 0 && requestCheckbox.replacement) {
      if (
        !refundInfo.customer_name ||
        !refundInfo.acc_no ||
        !refundInfo.confirm_acc_no ||
        !refundInfo.ifsc_code
      ) {
        message.error("Please fill all  fields");
        return;
      }
      if (refundInfo.acc_no !== refundInfo.confirm_acc_no) {
        message.error("Account No & Confirm Account No is not match! ");
        return;
      }
    }
    if (
      !requestCheckbox.rvp &&
      !requestCheckbox.refund &&
      !requestCheckbox.replacement
    ) {
      message.error("Please select  at least one checkbox");
      return;
    }

    let payload = {
      storeid: data.store_id["$oid"],
      shipment_vfid: data.shipment_vfid,
      awb: data.awb,
      type: {
        rvp: requestCheckbox.rvp,
        refund: requestCheckbox.refund,
        replacement: requestCheckbox.replacement,
      },
      items: data?.items.filter((item) => item.selected),
      refund: requestCheckbox.refund
        ? { ...refundInfo, amount: parseInt(refundInfo.amount) }
        : [],
      rvp: {
        reason: rvpReason ? rvpReason : "",
      },
    };
    try {
      const res = await raiseShipmentDisputeAction(payload);
      message.success(res.msg || "Success");
      if (requestCheckbox.refund) {
        setTimeout(() => {
          redirectFunction(res?.dispute_id, "refund_end_customer");
        }, 1000);
      } else if (requestCheckbox.rvp) {
        setTimeout(() => {
          redirectFunction(res?.dispute_id, "reverse_pickup");
        }, 1000);
      } else if (requestCheckbox.replacement) {
        setTimeout(() => {
          redirectFunction(res?.dispute_id, "replacement");
        }, 1000);
      }

      onClose();
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div className="shipment-request-action-modal-conatainer">
      {" "}
      <HeaderSection
        onClose={onClose}
        headingText="Request Action On Delivered Order"
      />
      <OrderInfo obj={modal.data.obj} />
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
      <RequestActionContainer
        requestCheckbox={requestCheckbox}
        setRequestCheckbox={setRequestCheckbox}
        data={data}
      />
      <div className="infoSection-container">
        {requestCheckbox.refund && (
          <RefundSection
            refundInfo={refundInfo}
            setRefundInfo={setRefundInfo}
            shipmentTotalAmount={modal?.data?.obj?.shipmentTotalAmount}
            data={data}
          />
        )}
        {requestCheckbox.rvp && (
          <ReversePickUpSection
            data={data}
            rvpReason={rvpReason}
            setRvpReason={setRvpReason}
          />
        )}
        {requestCheckbox.replacement && <ReplaceSection />}
      </div>
      <div className="footer-container">
        <Button
          type="primary"
          className="submit-btn"
          onClick={handleSubmit}
          //   loading={loading}
          //   disabled={!note}
        >
          {" "}
          Request Action
        </Button>
      </div>
    </div>
  );
};
