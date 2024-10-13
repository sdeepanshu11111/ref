import React from "react";
import { remittenceObj } from "./constants";
import "./index.scss";
export const RemittanceStatusCol = ({ obj, colHeight }) => {
  return (
    <div
      className="remittence-status-col"
      style={{
        height: colHeight,
      }}
    >
     
      <div
        className="status-container"
        style={{ ...remittenceObj[obj?.remittance_status?.status]?.style }}
      >
        {remittenceObj[obj?.remittance_status?.status]?.label}
      </div>
    </div>
  );
};
