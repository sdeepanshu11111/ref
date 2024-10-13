import { Button, Dropdown, Tooltip } from "antd";
import React, { useContext } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { items } from "./constants.jsx";
import "./index.scss";

import OrdersContext from "../../OrdersContext/index.js";
import { BlackInfoIcon, GreenTickSign, HoverInfoIcon } from "../../Icons";

export const ActionCol = ({ obj, colHeight }) => {
  const { currentPage, setModal, currentTab } = useContext(OrdersContext);
  const posibleValues = ["rvp", "refund", "replacement", "escalated"];
  const itemss = [];
  function calculateEscalation(obj) {
    let escalatedisabled = false;
    let daysLeft = 0;

    let d1 = new Date(obj?.closed_on);
    d1.setDate(d1.getDate() + 7);
    const d2 = new Date();
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    if (d2 > d1) {
      escalatedisabled = true;
      daysLeft = 0;
    } else {
      daysLeft = Math.ceil((d1 - d2) / (1000 * 60 * 60 * 24));
    }

    return {
      escalatedisabled: escalatedisabled,
      daysLeft: daysLeft,
    };
  }
  posibleValues.forEach((action) => {
    if (action == "refund") {
      if (obj?.request_status?.refund === 2 || obj?.gst_enabled == 1) {
        return;
      } else {
        if (obj?.request_status?.refund === 1) {
          itemss.push({
            key: "refund",
            label: (
              <span>
                Refund End Customer{" "}
                <Tooltip
                  rootClassName="action-shipment-tick-tooltip"
                  title="Action already taken."
                >
                  <span className="icon-container">
                    <GreenTickSign />
                  </span>
                </Tooltip>
              </span>
            ),
            disabled: true,
          });
        } else {
          itemss.push({
            key: "refund",
            label: "Refund End Customer",
          });
        }
      }

      // obj?.request_status?rvp
    }
    if (action == "replacement") {
      if (obj?.request_status?.replacement === 1) {
        itemss.push({
          key: "replacement",
          label: (
            <span>
              Replacement
              <Tooltip
                rootClassName="action-shipment-tick-tooltip"
                title="Action already taken."
              >
                <span className="icon-container">
                  <GreenTickSign />
                </span>
              </Tooltip>
            </span>
          ),
          disabled: true,
        });
      } else {
        itemss.push({
          key: "replacement",
          label: "Replacement",
        });
      }
    }
    if (action == "rvp") {
      if (obj?.request_status?.rvp === 1) {
        itemss.push({
          key: "rvp",
          label: (
            <span>
              Reverse Pickup
              <Tooltip
                rootClassName="action-shipment-tick-tooltip"
                title="Action already taken."
              >
                <span className="icon-container">
                  <GreenTickSign />
                </span>
              </Tooltip>
            </span>
          ),
          disabled: true,
        });
      } else {
        itemss.push({
          key: "rvp",
          label: "Reverse Pickup",
        });
      }
    }
    if (action === "escalated") {
      if (obj?.request_status?.rvp === 1) {
        itemss.push({
          key: "raiseEscalation",
          label: (
            <span>
              Raise Escalation
              <Tooltip
                rootClassName="action-shipment-tick-tooltip"
                title="Action already taken."
              >
                <span className="icon-container">
                  <GreenTickSign />
                </span>
              </Tooltip>
            </span>
          ),
          disabled: true,
        });
      } else if (obj?.request_status?.rvp === 2) {
        itemss.push({
          key: "raiseEscalation",
          label: (
            <span className="custom-item-container">
              Raise Escalation
              <Tooltip
                rootClassName="action-shipment-tick-tooltip"
                title="You have already raised a request against this shipment."
              >
                <span className="icon-container-2">
                  <span className="normal">
                    {" "}
                    <BlackInfoIcon />{" "}
                  </span>
                  <span className="hover">
                    {" "}
                    <HoverInfoIcon />{" "}
                  </span>
                </span>
              </Tooltip>
            </span>
          ),
          disabled: true,
        });
      } else {
        const { escalatedisabled, daysLeft } = calculateEscalation(obj);
        if (!daysLeft) {
          itemss.push({
            key: "raiseEscalation",
            label: (
              <span className="custom-item-container">
                Raise Escalation ( {daysLeft} days left)
                <Tooltip
                  rootClassName="action-shipment-tick-tooltip"
                  title="You can raise an escalation within 7 days "
                >
                  <span className="icon-container-2">
                    <span className="normal">
                      {" "}
                      <BlackInfoIcon />{" "}
                    </span>
                    <span className="hover">
                      {" "}
                      <HoverInfoIcon />{" "}
                    </span>
                  </span>
                </Tooltip>
              </span>
            ),
            disabled: escalatedisabled,
          });
        } else {
          itemss.push({
            key: "raiseEscalation",
            label: <span>Raise Escalation ( {daysLeft} days left)</span>,
            disabled: escalatedisabled,
          });
        }
      }
    }
  });
  const handleClick = (e) => {
    if (e.key === "raiseEscalation") {
      setModal({
        open: true,
        currentModal: "reviewLineitemEscalation",
        data: obj,
      });

      return;
    }
    let requestCheckbox = {
      refund: false,
      replacement: false,
      rvp: false,
    };
    requestCheckbox[e.key] = true;
    setModal({
      open: true,
      currentModal: "shipmentAction",
      data: { obj, requestCheckbox },
    });
  };

  return (
    <div
      className="shipment-action-col-container"
      style={{
        height: colHeight,
      }}
    >
      {obj.status === "delivered" ? (
        <Dropdown
          menu={{ items: itemss, onClick: handleClick }}
          placement="bottomLeft"
          width="100%"
          arrow
          overlayClassName="shipment-action-overlay-container"
          className="dropdown-container"
        >
          <Button>
            Request Action
            <span className="sec-icon-container">
              <Arrow />
            </span>
          </Button>
        </Dropdown>
      ) : (
        <Tooltip title="No action can be taken at the moment">
          <span>
          <Dropdown
            menu={{ items: itemss, onClick: handleClick }}
            placement="bottomLeft"
            width="100%"
            disabled
            arrow
            overlayClassName="shipment-action-overlay-container"
            className="dropdown-container"
          >
            <Button>
              Request Action
              <span className="sec-icon-container">
                <Arrow />
              </span>
            </Button>
          </Dropdown>
          </span>
        </Tooltip>
      )}
    </div>
  );
};
