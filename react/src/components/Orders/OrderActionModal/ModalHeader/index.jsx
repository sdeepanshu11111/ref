import React from "react";
import "./index.scss";

const headings = {
  place: "Place Order(s)",
  verify: "Acknowledge Order Confirmation",
  move_to_calling: "Move To Calling",
  hold: "Put Order On Hold Confirmation",
  unhold: "Release Orders from Hold Confirmation",
  donot_fulfill: "Not To Fulfill Order Confirmation",
  cancel: "Order Cancellation Confirmation",
  cancel_placed_orders: "Verified Order Cancellation Confirmation",
};

const subHeadings = {
  place:
    "Once order(s) for items below are confirmed & placed, vFulfill will fulfill & deliver them for you.",
  verify:
    "Once order(s) for items below are confirmed and placed, vFulfill will manage & fulfill them for you.",
  move_to_calling:
    "Once order(s) for items below are confirmed and placed, vFulfill will proceed to call the customers for further processing.",
  hold: "The following orders will be put on hold for the duration that you select. Once an order has been put on hold, no further action can be taken on it until it has been Unheld manually or after the hold duration ends.",
  unhold:
    "The following orders will be released from hold and resume their regular processing.",
  donot_fulfill:
    "By marking following orders as “Do Not Fulfill” you are acknowledging that these orders should not be fulfilled by vFulfill and will be taken care of by you.",
  cancel: "You are about to cancel the following orders.",
};

const ModalHeader = ({ currentModal }) => {
  return (
    <div className="action-modal-header">
      <h1> {headings[currentModal]} </h1>
      <h2> {subHeadings[currentModal]} </h2>
    </div>
  );
};

export default ModalHeader;
