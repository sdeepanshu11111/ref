import React from "react";
import "./index.scss";

export const NDRJourney = ({ obj, colHeight }) => {
  return (
    <div
      className="NDR-Journey-col"
      style={{
        height: colHeight,
      }}
    >
      No NDR

        {/* {obj?.ndr_journey.length ? "No NDR" : "No NDR"} */}
    </div>
  );
};
