import moment from "moment/moment";
import React from "react";
import "./index.scss";
export const NDRJourneyRow = ({ item, index }) => {
  let isOdd = (num) => {
    return num % 2;
  };
  return (
    <div
      className={
        isOdd(index)
          ? "ndrJourneyrow-container ndrJourneyrow-containerodd"
          : "ndrJourneyrow-container"
      }
    >
      <div className="ndr-remarks-container">{item?.remark} </div>
      <div className="bottom-row-container">
        <div className="time-container">
          {moment(item?.date).format("DD MMM, YYYY | HH:MM")}
        </div>
        <div className="by-container">{item?.addedby}</div>
      </div>
    </div>
  );
};
