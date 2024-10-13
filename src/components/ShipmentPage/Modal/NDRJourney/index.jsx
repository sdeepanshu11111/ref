import { Timeline } from "antd";
import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";
import { NDRJourneyRow } from "./NDRJourneyRow";
export const NDRJourney = ({ onClose }) => {
  const { modal } = useContext(OrdersContext);
  return (
    <div className="shipmentpage-ndrJourney-modal">
      {" "}
      <HeaderSection onClose={onClose} headingText="NDR Journey" />
      <OrderInfo obj={modal?.data} />
      <div className="main-container">
        <Timeline
          pendingDot={<span className="dot"></span>}
          rootClassName="ndr-journey-timeline-container"
          items={modal?.data.ndr_remarks.map((item,index) => {
            return {
              children: <NDRJourneyRow item={item} index={index} />,
              dot: <span className="dot-custom"></span>
            };
          })}
        />
      </div>
    </div>
  );
};
