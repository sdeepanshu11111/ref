import React from "react";
import "./index.scss";
export const EscatationCol = ({ obj, colHeight }) => {
  return (
    <div
      className="Escatation-Col"
      style={{
        height: colHeight,
      }}
    >
      No
      {/* {obj?.escalation_journey.length? "No" : "No"} */}
    </div>
  );
};
