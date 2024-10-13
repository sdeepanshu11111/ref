import { Button, Flex, Tooltip } from "antd";
import React from "react";

import {
  WhatsAppIcon,
  EditIcon,
  PhoneIcon,
  ShipmentCancelTruckIcon,
  ShipmentTruckIcon,
} from "../../../../../../Icons";

import "./index.scss";
export const DemoCustomerInfo = ({ data }) => {
  const iserror = false;

  return (
    <Flex
      vertical={true}
      gap={0}
      className={
        iserror
          ? "orderTable-demo-customer-info-col orderTable-demo-customer-info-col-alert"
          : "orderTable-demo-customer-info-col"
      }
      style={{
        height: "160px",
      }}
    >
      <div className="row-first">
        {" "}
        <div className="name-container">
          {data.subTabArray[0].visible && "Rishabh Saxena"}
        </div>
        <div className="email-container">
          {" "}
          {data.subTabArray[1].visible && "rishabh@letreach.com"}
        </div>
      </div>
      <div className="row-sec">
        {" "}
        {data.subTabArray[2].visible && (
          <>
            {" "}
            <span className="number-container">+91 9839 983 485</span>{" "}
          
          </>
        )}
      </div>
      <div className="row-third">
        {data.subTabArray[4].visible && (
          <div>
            <Tooltip title="Serviceable">
              <span>
                <ShipmentTruckIcon />
              </span>
            </Tooltip>
          </div>
        )}

        <div className="addressContainer">
          {data.subTabArray[3].visible &&
            "3402, Prestige Colony, Kamalpura Bangalore, Karnataka, 560062"}
        </div>
        <div>
      
        </div>
      </div>
    </Flex>
  );
};
