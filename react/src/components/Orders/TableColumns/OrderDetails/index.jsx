import React, { useContext } from "react";
import OrdersContext from "../../OrdersContext";
import {
  CODIcon,
  StoreIcon,
  SearchFile,
  PrepaidIcon,
  ExternalLink,
} from "../../Icons";
import { Button, Checkbox, Flex } from "antd";
import "./index.scss";
import { useSelector } from "react-redux";
import ClickToCopy from "../../../ClickToCopy";
import { CopyIcon } from "../../../NDRPage/Icons";

export const OrderDetails = ({ obj, colHeight, subData }) => {
  const { currentPage, currentTab, setCurrentTab, orders, setOrders, auth } =
    useContext(OrdersContext);

  const handleCheckboxChange = (e, obj) => {
    setOrders(
      orders.map((o) => {
        if (o._id.$oid === obj._id.$oid) {
          o.selected = e.target.checked;
          o.line_items.forEach((item) => (item.selected = e.target.checked));
        }
        return o;
      })
    );
  };

  let currentStoreName =
    auth?.auth?.user?.user_stores[obj?.order_storeid?.$oid]?.store_name;

  const rtoRiskChecker = (score) => {
    try {
      if (score < 50) {
        return (
          <>
            {" "}
            <div className="color-circle red"> </div> High RTO Risk
          </>
        );
      }

      if (score > 50 && score < 70) {
        return (
          <>
            {" "}
            <div className="color-circle yellow"> </div> Moderate RTO Risk{" "}
          </>
        );
      }

      if (score > 70) {
        return (
          <>
            <div className="color-circle green"> </div> Low RTO Risk{" "}
          </>
        );
      }
    } catch (error) {}
  };
  return (
    <Flex
      style={{
        height: colHeight,
      }}
      className="order-details-cell"
      align="start"
      gap={10}
    >
      <Checkbox
        indeterminate={
          obj?.line_items?.some((item) => !item.selected) &&
          obj?.line_items?.some((item) => item.selected)
        }
        checked={obj.selected}
        onChange={(e) => handleCheckboxChange(e, obj)}
      />

      <Flex vertical gap={8}>
        <div className="row_one">
          {subData[0].visible && (
            <h1>
              {" "}
              <ClickToCopy
                textToCopy={obj?.order_vfid}
                customIcon={<CopyIcon />}
              />{" "}
            </h1>
          )}
          {subData[1].visible && (
            <h2>
              <span className="heading">Store Order: </span>
              <span className="flex gap-1">
                {" "}
                <ClickToCopy
                  textToCopy={obj?.order_shopify?.name}
                  customIcon={<CopyIcon />}
                />{" "}
                <a
                  className="external-link-a text-[#514de2] font-medium"
                  href={obj?.order_link}
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
            {subData[2].visible && (
              <>
                {obj?.is_cod ? <CODIcon /> : <PrepaidIcon />}
                {obj?.is_cod ? "COD" : "Prepaid"}
              </>
            )}
            {subData[3].visible && subData[2].visible && (
              <div className="vr_line" />
            )}
            {subData[3].visible && (
              <span>
                ₹{" "}
                {obj?.total_order_value.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </h1>
          {subData[4].visible && (
            <h2>
              <StoreIcon /> {currentStoreName}
            </h2>
          )}
        </div>

        {subData[4].visible && (
          <div className="row_three">{rtoRiskChecker(obj.score)}</div>
        )}
      </Flex>
    </Flex>
  );
};
