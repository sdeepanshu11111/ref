import React from "react";
import { bucket } from "./contants";
import "./index.scss";
export const NdrDetails = ({ obj, colHeight, subData }) => {
  return (
    <div
      className="shipmentPage-ndr-details"
      style={{
        height: colHeight,
      }}
    >
      {obj?.ndr_remarks?.length ? (
        <div className="row-container">
          <span className="heading">NDR Reason: </span>
          <span className="value">{obj?.ndr_remarks[obj?.ndr_remarks.length -1]?.remark}</span>
        </div>
      ) : null}
      <div className="row-container">
        <span className="heading">NDR Bucket: </span>
        <span className="value">{bucket[obj.ndr_bucket_code]} </span>
      </div>
    </div>
  );
};
