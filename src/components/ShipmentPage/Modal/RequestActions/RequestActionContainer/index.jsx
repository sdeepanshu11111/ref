import { Checkbox } from "antd";
import React from "react";
import "./index.scss";
export const RequestActionContainer = ({
  requestCheckbox,
  setRequestCheckbox,
  data,
}) => {
  const handleCheckboxChange = (e, key) => {
    setRequestCheckbox((pre) => {
      return {
        ...pre,
        [key]: e.target.checked,
      };
    });
  };

  return (
    <div className="shipment-checkbox-section-container">
      <div className="section-heading">Requesting following actions:</div>
      <div className="first-row">
        {data?.request_status?.refund == 0 && (
          <Checkbox
            checked={requestCheckbox.refund}
            onChange={(e) => handleCheckboxChange(e, "refund")}
          >
            Refund End Customer
          </Checkbox>
        )}

        {data?.request_status?.rvp == 0 && (
          <Checkbox
            checked={requestCheckbox.rvp}
            onChange={(e) => handleCheckboxChange(e, "rvp")}
          >
            Reverse Pickup
          </Checkbox>
        )}
      </div>

      <div>
        {data?.request_status?.replacement == 0 && (
          <Checkbox
            checked={requestCheckbox.replacement}
            onChange={(e) => handleCheckboxChange(e, "replacement")}
          >
            Replacement
          </Checkbox>
        )}
      </div>
    </div>
  );
};
