import React, { useContext } from "react";
import OrdersContext from "../../NDRContext";
import {
  CODIcon,
  StoreIcon,
  SearchFile,
  PrepaidIcon,
  CopyIcon,
} from "../../Icons";
import { Checkbox, Flex } from "antd";
import "./index.scss";
import { useSelector } from "react-redux";
import ClickToCopy from "../../../ClickToCopy";
import moment from "moment";
import NDRContext from "../../NDRContext";

export const OrderDetails = ({ obj, colHeight, subData }) => {
  const { currentPage, currentTab, setCurrentTab, orders, setOrders, auth } =
    useContext(NDRContext);

  const handleCheckboxChange = (e, obj) => {
    setOrders(
      orders.map((o) => {
        if (o._id.$oid === obj._id.$oid) {
          o.selected = e.target.checked;
          o.items.forEach((item) => (item.selected = e.target.checked));
        }
        return o;
      })
    );
  };

  return (
    <Flex
      style={{
        height: colHeight,
      }}
      className="ndr-details-cell"
      align="start"
      gap={10}
    >
      {currentTab == "pending" && (
        <Checkbox
          indeterminate={
            obj?.items?.some((item) => !item.selected) &&
            obj?.items?.some((item) => item.selected)
          }
          checked={obj.selected}
          onChange={(e) => handleCheckboxChange(e, obj)}
        />
      )}

      <Flex vertical gap={8}>
        <div className="row_one">
          {subData[0].visible && (
            <h2>
              <span className="heading">AWB: </span>
              <span className="value">{obj?.awb}</span>{" "}
            </h2>
          )}

          {subData[1].visible && (
            <h1>
              Packed On {moment(obj?.shipment_date).format("DD MMM, YYYY")}{" "}
            </h1>
          )}
        </div>
        <div className="row_two">
          {subData[2].visible && (
            <div className="vfpd-container">{obj?.order_vfid}</div>
          )}
          {subData[3].visible && (
            <h1>
              <span className="heading">Store Order: </span>
              <span>
                <ClickToCopy
                  sh
                  textToCopy={obj?.order_shopify_name}
                  customIcon={<CopyIcon />}
                />
              </span>{" "}
            </h1>
          )}

          <h1>
            {subData[4].visible && (
              <>
                {obj?.is_cod ? <CODIcon /> : <PrepaidIcon />}
                {obj?.is_cod ? "COD" : "Prepaid"}
                <div>|</div>
              </>
            )}

            {subData[5].visible && (
              <div className="order-value-container">
                ₹{" "}
                {obj?.total_order_cost?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            )}
          </h1>
          {subData[6].visible && (
            <h2 className="store-name-container">
              <StoreIcon /> {obj?.storename}
            </h2>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
