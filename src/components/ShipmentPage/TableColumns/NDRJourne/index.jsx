import { Button } from "antd";
import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";

import { recommendeActions } from "./constants";
import { ndrStatus } from "./constants";
import "./index.scss";
export const NDRJourne = ({ obj, colHeight }) => {
  const { setModal } = useContext(OrdersContext);
  const { status, ndr_status, ndr_date } = obj;

  const handleOpenModal = () => {
    setModal({
      open: true,
      currentModal: "ndrJourney",
      data: obj,
    });
  };
  return (
    <div
      className="shipmentPage-ndrJourney-col"
      style={{
        height: colHeight,
      }}
    >
      {obj?.status == "ndr_actionable" ? (
        <>
          
          <div className="row-container">
            <span className="heading">Remaining NDR Reattempts: </span>
            <span
              className={
                obj.remaining_reattemptCount
                  ? "ndr-attempt-count"
                  : "ndr-attempt-count ndr-attempt-count-red"
              }
            >
              {obj.remaining_reattemptCount}/3
            </span>
          </div>
          {status == "delivered" || status == "rto"
            ? null
            : obj?.recommended_ndr_action != "N/A" && (
                <div className="row-container">
                  <span className="heading">Recommended Action: </span>
                  <span className="stage-container">
                    {obj?.recommended_ndr_action}
                  </span>
                </div>
              )}
                <div className="row-container">
                  <span className="heading">Last Action Taken: </span>
                  <span className="stage-container">
                    {obj?.ndr_last_action_taken}
                  </span>
                </div>
          <div>
            <Button className="modal-btn" onClick={handleOpenModal}>
              View Full Journey
            </Button>
          </div>
        </>
      ) : <div className="placeholder-text"> No NDR</div>}
    </div>
  );
};
