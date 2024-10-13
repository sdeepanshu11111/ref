import { Button, Flex, Tooltip } from "antd";
import React from "react";
import { useContext } from "react";
import { isorderWithMissingDetails } from "../../Functions/ordersHelperFunctions";

import {
  AlertIcon,
  EditIcon,
  PhoneIcon,
  ShipmentCancelTruckIcon,
  ShipmentTruckIcon,
  WhatsAppIcon,
} from "../../Icons";
import OrdersContext from "../../NDRContext";
import "./index.scss";
export const CustomerInfo = ({ obj, currentKey, colHeight, subData }) => {
  const { currentPage, currentTab, setCurrentTab, setModal } =
    useContext(OrdersContext);

  const handleOpenAddTag = () => {
    setModal({
      open: true,
      currentModal: "editCustomerInfo",
      data: obj,
    });
  };
  const iserror = isorderWithMissingDetails(obj);

  return (
    <>
      <div
        id={iserror && "orderTable-customer-info-col-abolute"}
        style={{
          height: colHeight,
        }}
      >
        <Flex
          vertical={true}
          gap={0}
          id={iserror && "orderTable-customer-info-col-alert"}
          className={
            iserror
              ? "orderTable-customer-info-col orderTable-customer-info-col-alert"
              : "orderTable-customer-info-col"
          }
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
                {!obj.is_servicable ? (
                  <Tooltip title="Not Serviceable">
                    <span>
                      {" "}
                      <ShipmentCancelTruckIcon />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title="Serviceable">
                    <span>
                      <ShipmentTruckIcon />
                    </span>
                  </Tooltip>
                )}
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
    
      </div>
    </>
  );
};
