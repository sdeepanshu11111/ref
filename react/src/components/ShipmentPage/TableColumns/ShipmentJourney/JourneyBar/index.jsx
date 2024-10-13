import dayjs from "dayjs";
import React from "react";
import "./index.scss";
export const JourneyBar = ({ data,index }) => {
  return (
    <div className= {index == 0?"journey-bar-container current-journey-bar-container ":"journey-bar-container"}>
      <div className="item date">
      <span className="dat">{dayjs(data?.date).format("DD MMM, YYYY")}</span>  
      <span className="divider">|</span>
      <span className="d">{dayjs(data?.date).format("dddd")}</span>
      </div>
      <div className="item remark">{data.remark}</div>
      <div className="item location">
        <span>{data.location}</span>
        <span style={{
          margin: "0px 2px"
        }}> | </span>
        <span>{data.city}</span>
      </div>
    </div>
  );
};
