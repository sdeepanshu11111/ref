import React from "react";
import { statusObj } from "./constants";
import "./index.scss";
import moment from "moment";
import { Tag } from "antd";
export const OrderStatus = ({ obj, colHeight }) => {
  const cancelHandler = (status, data) => {
    const firstSku = data?.line_items[0];

    if (status === "Cancelled") {
      if (data?.cancelled_at && data?.cancellation_reason) {
        return (
          <div className="cancel-time mt-3 text-xs font-semibold text-[#848484]">
            Cancellation Reason:{" "}
            <Tag bordered={false} color="orange">
              {data?.cancellation_reason}
            </Tag>
          </div>
        );
      } else if (firstSku?.cancellation_reason) {
        return (
          <div className="cancel-time mt-3 text-xs font-semibold text-[#848484]">
            Cancellation Reason:
            <Tag bordered={false} color="orange" className="capitalize">
              {firstSku?.cancellation_reason}
            </Tag>
          </div>
        );
      } else {
        return (
          <div className="cancel-time mt-3 text-xs font-semibold text-[#848484]">
            Cancellation Reason:
            <Tag bordered={true}>N/A</Tag>
          </div>
        );
      }
    }
  };

  return (
    <div
      className="order-status-col"
      style={{
        height: colHeight,
      }}
    >
      <div
        className="status-container"
        style={{
          backgroundColor: "#0000ff33",
          color: "#0000ffc7",
          fontWeight: 600,
          ...statusObj[obj.order_status]?.style,
        }}
      >
        {obj.order_status}
      </div>
      {cancelHandler(obj.order_status, obj)}
    </div>
  );
};
