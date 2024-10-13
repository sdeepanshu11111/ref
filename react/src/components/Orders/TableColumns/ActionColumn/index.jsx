import { Button, Dropdown, Tooltip } from "antd";
import React, { useContext } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { items } from "./constants.jsx";
import "./index.scss";

import OrdersContext from "../../OrdersContext/index.js";

export const ActionCol = ({ obj, colHeight }) => {
  const {
    currentPage,
    orders,
    setOrderActionModal,
    setModal,
    filters,
    currentTab,
    setOrders,
  } = useContext(OrdersContext);

  const handleCheckboxChange = (obj) => {
    if (obj.selected && obj.line_items.some((item) => item.selected)) {
      setOrders(
        orders.map((o) => {
          if (o._id.$oid === obj._id.$oid) {
            o.selected = true;
          } else {
            o.selected = false;
            o.line_items.forEach((item) => (item.selected = false));
          }
          return o;
        })
      );
    } else {
      setOrders(
        orders.map((o) => {
          if (o._id.$oid === obj._id.$oid) {
            o.selected = true;
            o.line_items.forEach((item) => (item.selected = true));
          } else {
            o.selected = false;
            o.line_items.forEach((item) => (item.selected = false));
          }
          return o;
        })
      );
    }
  };

  let orderStatus =
    obj?.line_items?.length && obj?.line_items[0]["item_vforderstatus"];
  let shipmentStatus =
    obj?.line_items?.length && obj?.line_items[0]["item_shipmentstatus"];

  const createActionItem = (label, actionModalType, disabled = false) => {
    // Define disabling conditions for each action
    let disableConditions = false;

    switch (actionModalType) {
      case "place":
        disableConditions = [
          "cancelled",
          "hold",
          "not_fulfill",
          "notlinked",
          "verified_ordered",
        ].includes(orderStatus);
        break;
      case "verify":
        disableConditions = [
          "cancelled",
          "hold",
          "not_fulfill",
          "notlinked",
          "verified_ordered",
          "verified",
        ].includes(orderStatus);
        break;
      // here is negative check
      case "move_to_calling":
        disableConditions = [
          "cancelled",
          "hold",
          "not_fulfill",
          "notlinked",
          "verified_ordered",
          "calling_inprogress",
        ].includes(orderStatus);
        break;
      case "donot_fulfill":
        disableConditions =
          ["cancelled", "notlinked", "verified_ordered"].includes(
            orderStatus
          ) || currentTab === "do_not_fulfill";
        break;
      case "hold":
        disableConditions = ["hold", "verified_ordered", "cancelled"].includes(
          orderStatus
        );
        break;
      case "unhold":
        disableConditions = orderStatus !== "hold";
        break;

      // here is negative check
      case "move_to_open":
        disableConditions = ![
          "not_fulfill",
          "verified",
          "calling_inprogress",
        ].includes(orderStatus);
        break;
      case "cancel":
        disableConditions =
          orderStatus === "cancelled" ||
          shipmentStatus !== "manifested" ||
          shipmentStatus !== "processing" ||
          orderStatus === "notlinked" ||
          currentTab === "delivered" ||
          currentTab === "returned";
        break;
      default:
        break;
    }

    return {
      key: actionModalType,
      label: (
        <div
          className={`bulk-item${
            disabled || disableConditions ? " disabled" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleCheckboxChange(obj);
            if (!disabled && !disableConditions) {
              if (
                actionModalType === "cancel" &&
                currentPage === "in_processing"
              ) {
                setOrderActionModal({
                  open: true,
                  currentModal: "cancel_placed_orders",
                  data: orders,
                });
              } else {
                setOrderActionModal({
                  open: true,
                  currentModal: actionModalType,
                  data: orders,
                });
              }
            }
          }}
        >
          {label}
        </div>
      ),
      disabled: disabled || disableConditions,
    };
  };

  const placeAction = {
    items: [
      createActionItem("Place Order", "place"),
      createActionItem(
        <div>
          <span>Marks As</span> Verified{" "}
        </div>,
        "verify"
      ),
      createActionItem(
        <div>
          <span>Move To</span> Calling{" "}
        </div>,
        "move_to_calling"
      ),
      createActionItem(
        <div>
          <span>Marks As</span> Do Not Fulfill{" "}
        </div>,
        "donot_fulfill"
      ),
      createActionItem(
        <div>
          <span>Move To</span> On-Hold{" "}
        </div>,
        "hold"
      ),

      createActionItem("Un-Hold", "unhold"),
      createActionItem(
        <div>
          <span>Move To</span> Open{" "}
        </div>,
        "move_to_open"
      ),
      createActionItem("Cancel Order", "cancel"),
    ],
  };

  return (
    <div
      className="action-col-container"
      style={{
        height: colHeight,
      }}
    >
      <Tooltip
        title={
          placeAction.items.every((e) => e.disabled)
            ? "No action can be taken at the moment"
            : null
        }
      >
        <span>
          <Dropdown
            menu={placeAction}
            placement="bottomLeft"
            width="100%"
            // arrow={{
            //   pointAtCenter: true,
            // }}
            // arrow={false}
            disabled={placeAction.items.every((e) => e.disabled)}
            autoAdjustOverflow={true}
            autoFocus={true}
            overlayClassName="bulk-options-single-container"
            className="bulk-actions-single-dropdown-container"
          >
            <Button>
              Take Action{" "}
              <span className="sec-icon-container">
                <Arrow />
              </span>
            </Button>
          </Dropdown>
        </span>
      </Tooltip>
    </div>
  );
};
