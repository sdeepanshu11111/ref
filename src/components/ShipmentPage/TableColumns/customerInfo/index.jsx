import { Button, Flex, Tooltip } from "antd";
import React from "react";
import { ShipmentTruckIcon } from "../../Icons";
import "./index.scss";
export const CustomerInfo = ({ obj, colHeight, subData }) => {
  return (
    <Flex
      vertical={true}
      gap={0}
      className={"shipmentTable-customer-info-col"}
      style={{
        height: colHeight,
      }}
    >
      <div className="row-first">
        {" "}
        <div className="name-container">
          {subData[0]?.visible && obj?.customer_details?.name}
        </div>
        <div className="email-container">
          {subData[1]?.visible && obj?.customer_details?.email}
        </div>
      </div>
      {subData[2]?.visible && (
        <div className="row-sec">
          {" "}
          <span className="number-container">
            {obj?.shipping_address?.phone}
          </span>{" "}
        </div>
      )}

      <div className="row-third">
        {subData[4]?.visible && (
          <div>
            <Tooltip title="Serviceable">
              <span>
                <ShipmentTruckIcon />
              </span>
            </Tooltip>
          </div>
        )}

        <div className="addressContainer">
          {subData[3]?.visible &&
            `${obj?.shipping_address?.address1}, ${
              obj?.shipping_address?.address2 &&
              obj?.shipping_address?.address2 + ","
            } ${obj?.shipping_address?.city},${
              obj?.shipping_address?.province
            } `}
        </div>
      </div>
    </Flex>
  );
};
