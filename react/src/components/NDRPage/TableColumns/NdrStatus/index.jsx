import { Button } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import NDRContext from "../../NDRContext";
import { recommendeActions } from "./constants";
import { ndrStatus } from "./constants";
import "./index.scss";
export const NdrStatus = ({ obj, colHeight, subData }) => {
  const { setModal } = useContext(NDRContext);
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
      className="ndrPage-ndrstatus-col"
      style={{
        height: colHeight,
      }}
    >
      <div className="row-container">
        <span className="heading">NDR Status: </span>
        {status == "delivered" || status == "rto" ? (
          <>
            <span
              className="circle"
              style={{
                backgroundColor: "#168F64",
              }}
            ></span>{" "}
            <span className="value">Closed</span>
          </>
        ) : (
          <>
            <span
              className="circle"
              style={{
                backgroundColor: ndrStatus[ndr_status].backgroundColor,
              }}
            ></span>{" "}
            <span className="value">{ndrStatus[ndr_status].label}</span>
          </>
        )}
      </div>
      <div className="row-container">
        <span className="heading">NDR Raised On: </span>
        <span className="value">
          {moment(ndr_date).format("DD MMM, YYYY")}{" "}
        </span>
      </div>
      <div className="row-container">
        <span className="heading">Remaining NDR Reattempts: </span>
        <span className="ndr-attempt-count">
          {obj.remaining_reattemptCount}/3
        </span>
      </div>
      {status == "delivered" || status == "rto"
        ? null
        : obj?.recommended_ndr_action != "N/A" && (
            <div className="row-container">
              <span className="heading">Recommended Action: </span>
              <span className="stage-container">
                {recommendeActions[obj?.recommended_ndr_action]}{" "}
              </span>
            </div>
          )}

      <div>
        <Button className="modal-btn" onClick={handleOpenModal}>
          View Full Journey
        </Button>
      </div>
    </div>
  );
};
