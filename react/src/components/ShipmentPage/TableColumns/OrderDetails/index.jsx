import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import {
  CODIcon,
  StoreIcon,
  PrepaidIcon,
  ExternalLink,
} from "../../Icons";
import { Checkbox, Flex } from "antd";
import "./index.scss";
import { useSelector } from "react-redux";
import ClickToCopy from "../../../ClickToCopy";
import { useNavigate } from "react-router-dom";
import { CopyIcon } from "../../../NDRPage/Icons";

export const ShipmentDetails = ({ obj, colHeight, subData }) => {
  const navigate = useNavigate();

  return (
    <Flex
      style={{
        height: colHeight,
      }}
      className="shipment-details-cell"
      align="start"
      gap={10}
    >
      <Flex vertical gap={8}>
        <div className="awb-row">
          <h2>
            {subData[0].visible && (
              <>
                {" "}
                <span>AWB:</span>
                <ClickToCopy
                  textToCopy={obj?.awb}
                  customIcon={<CopyIcon />}
                />{" "}
              </>
            )}
          </h2>
        </div>
        <div className="row_one">
          {subData[1].visible && (
            <h1
              className="order-vfid-container"
          
            >
              <ClickToCopy
                textToCopy={obj?.order_vfid}
                customIcon={<CopyIcon />}
              />
              <a
                className="external-link-a text-[#514de2] font-medium relative top-px"
                onClick={() => {
                  navigate(`../orders?orderId=${obj?.order_vfid}&tab=all`);
                }}
              >
                {" "}
                <ExternalLink />
              </a>
            </h1>
          )}

          {subData[2].visible && (
            <h2>
              <span className="heading">Store Order: </span>
              <span className="flex gap-1">
                <ClickToCopy
                  textToCopy={obj?.order_shopify_name}
                  customIcon={<CopyIcon />}
                />{" "}
                <a
                  className="external-link-a text-[#514de2] font-medium relative top-px"
                  href={obj?.shopify_order_link}
                  target="_blank"
                >
                  {" "}
                  <ExternalLink />
                </a>
              </span>{" "}
            </h2>
          )}
        </div>
        <div className="row_two">
          <h1>
            {subData[3].visible && (
              <>
                {obj?.is_cod ? <CODIcon /> : <PrepaidIcon />}
                {obj?.is_cod ? "COD" : "Prepaid"}
              </>
            )}
            {subData[4].visible && subData[3].visible && (
              <div className="vr_line" />
            )}
            {subData[4].visible && (
              <span>
                ₹{" "}
                {obj?.shipmentTotalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </h1>
          {subData[5].visible && (
            <h2>
              <StoreIcon /> {obj?.storename}
            </h2>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
