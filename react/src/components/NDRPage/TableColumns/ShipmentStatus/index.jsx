import { Button } from "antd";
import moment from "moment/moment";
import React from "react";
import "./index.scss";
export const ShipmentStatus = ({ obj, colHeight, subData }) => {
  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <div
      className="ndrPage-shipmentstatus-col"
      style={{
        height: colHeight,
      }}
    >
      <div className="attempt-stage"> {obj?.ndr_count}{nthNumber(obj?.ndr_count)} Delivery Attempt</div>
      {obj?.ndr_remarks.length &&
       obj?.ndr_remarks[0].date ? (
        <div className="row-container">
          <span className="heading">Attempt On: </span>
          <span className="value">
            {moment(obj?.ndr_remarks[0].date).format("DD MMM, YYYY")}
          </span>
        </div>
      ) : null}

      <div>
        <a href={obj?.tracking_url} target="_blank">
          {" "}
          <Button className="modal-btn">Tracking Page</Button>
        </a>
      </div>
    </div>
  );
};
