import React from "react";
import { GlobalCustomSelect } from "../../../../GlobalCompoents/GlobalCustomSelect";
import { AlertYellow } from "../../../../Orders/Icons";
import "./index.scss";
import { replacementOptions } from "./constants";
import Arrow from "../../../../../assets/Icons/Arrow";
export const ReversePickUpSection = ({data , rvpReason, setRvpReason }) => {
  const handleChange = (e) => {
    setRvpReason(e);
  };
  return (
    <div className="reversePickupSection">
      {" "}
      <div className="divider-container">
        <div className="item-1"> Reverse Pickup</div>
        <div className="item-2"></div>
      </div>
      <div className="info-bar-container">
        <div>
          <AlertYellow />
        </div>
        <div>
          <span>Important:</span> RVP requests will be charged from your wallet
          as per the rate card.
        </div>
        <div className="charges">RVP Charges: ₹{data?.request_status?.rvp_charges}</div>
      </div>
      <div className="select-container">
        <GlobalCustomSelect
          label="Reverse Pickup Reason"
          options={replacementOptions}
          placeholder="Select a reverse pickup reason"
          suffixIcon={<Arrow />}
          value={rvpReason}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};
