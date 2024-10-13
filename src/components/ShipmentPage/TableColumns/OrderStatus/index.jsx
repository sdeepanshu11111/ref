import { Button } from "antd";
import moment from "moment";
import React from "react";
import { statusObj } from "./constants";
import "./index.scss";
export const OrderStatus = ({ obj, colHeight }) => {
  const DateDiffInDays = (datefirst, dateSec) => {
    const date1 = new Date(datefirst);
    const date2 = new Date(dateSec);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays == 1) {
      return "(In " + diffDays + "  day)";
    } else {
      return "(In " + diffDays + "  days)";
    }
  };
  return (
    <div
      className="shipment-status-col"
      style={{
        height: colHeight,
      }}
    >
      <div className="status-bar-container">
        <div
          className="status-container"
          style={{
            backgroundColor: "#0000ff33",
            color: "#0000ffc7",
            fontWeight: 600,
            ...statusObj[obj?.status]?.style,
          }}
        >
          {statusObj[obj?.status]?.label}
          {/* {obj.status} */}
        </div>
        {obj?.status == "delivered" && (
          <span className="days-container">
            {/* (In {DateDiffInDays(obj?.shipped_on, obj?.closed_on)} days) */}
            {DateDiffInDays(obj?.shipped_on, obj?.closed_on)}
          </span>
        )}
      </div>

      {obj?.status == "manifested" && (
        <div className="date-container">
          Packed On: {moment(obj.shipment_date).format("DD MMM, YYYY")}
        </div>
      )}
      {obj?.status == "transit" && (
        <div className="date-container">
          Shipped On:{" "}
          {moment(obj.shipping_timelines[obj?.status].date).format(
            "DD MMM, YYYY"
          )}
        </div>
      )}
      {obj?.status == "out_for_delivery" && (
        <div className="date-container">
          Attempt On:{" "}
          {moment(obj.shipping_timelines[obj?.status].date).format(
            "DD MMM, YYYY"
          )}
        </div>
      )}
      {obj?.status == "ndr_actionable" && (
        <>
          <div className="date-container">
            NDR Raised On:{" "}
            {moment(
              obj.shipping_timelines[obj?.status].date.ndr_raised_on
            ).format("DD MMM, YYYY")}
          </div>
          {!!obj.shipping_timelines[obj?.status].date.attempts.length > 1 && (
            <div className="date-container">
              Reattempt On:{" "}
              {moment(
                obj?.shipping_timelines[obj?.status].date?.attempts[
                  obj?.shipping_timelines[obj?.status].date.attempts.length - 1
                ]
              ).format("DD MMM, YYYY")}
            </div>
          )}
        </>
      )}

      <a href={obj?.tracking_url} target="_blank">
        <Button className="modal-btn">Tracking Page</Button>
      </a>
    </div>
  );
};
