import { Button, Flex, Tooltip } from "antd";
import React from "react";
import { useContext } from "react";
import { isorderWithMissingDetails } from "../../../Functions/ordersHelperFunctions";

import {
  AlertIcon,
  EditIcon,
  PhoneIcon,
  ShipmentCancelTruckIcon,
  ShipmentTruckIcon,
  WhatsAppIcon,
} from "../../../Icons";
import OrdersContext from "../../../OrdersContext";
import "./index.scss";
export const CustomerInfo = ({ obj, currentKey, colHeight }) => {
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
        id={iserror && "orderTable-customer-info-col-custom-abolute"}
        style={{
          height: colHeight,
        }}
      >
        <Flex
          vertical={true}
          gap={0}
          id={iserror && "orderTable-customer-info-col-custom-alert"}
          className={
            iserror
              ? "orderTable-customer-info-col-custom orderTable-customer-info-col-custom-alert"
              : "orderTable-customer-info-col-custom"
          }
        >
          <div className="row-first">
            {" "}
            <div className="name-container">{obj?.customer_details?.name}</div>
            <div className="email-container">
              {obj?.customer_details?.email}
            </div>
          </div>

          <div className="row-sec">
            {" "}
            <span className="number-container">
              {obj?.shipping_address?.phone}
            </span>{" "}
            <div>
              <span className="icon-container">
                <WhatsAppIcon />
              </span>{" "}
              <span className="icon-container">
                <PhoneIcon />{" "}
              </span>
            </div>
          </div>

          <div className="row-third">
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

            <div className="addressContainer">
              {`${obj?.shipping_address?.address1}, ${
                obj?.shipping_address?.address2 &&
                obj?.shipping_address?.address2 + ","
              } ${obj?.shipping_address?.city},${
                obj?.shipping_address?.province
              } `}
            </div>
            {/* <div>
              <Button
                type="text"
                className={iserror ? "withRed" : ""}
                icon={<EditIcon />}
                onClick={handleOpenAddTag}
              />
            </div> */}
          </div>
        </Flex>
        {iserror && (
          <div className="rowAlert">
            <span className="alert-icon-container">
              <AlertIcon />{" "}
            </span>
            <span className="heading">Attention Required:</span>{" "}
            <span> Customer Info!</span>
          </div>
        )}
      </div>
    </>
  );
};
