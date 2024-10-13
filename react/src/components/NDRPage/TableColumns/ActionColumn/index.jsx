import { Dropdown, message, Modal, Button, notification, Space } from "antd";
import React, { useContext } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import "./index.scss";

import OrdersContext from "../../NDRContext/index.js";
import initiateRTo from "../../Apis/initiateRToApi";
import moveToCallingAPI from "../../Apis/moveToCallingApi";
import { recommendeActions } from "./constants";
const { confirm } = Modal;

export const ActionCol = ({ obj, colHeight }) => {
  const {
    currentPage,
    orders,
    setOrderActionModal,
    setModal,
    filters,
    currentTab,
    setOrders,
    fetchData,
  } = useContext(OrdersContext);
  const [api, contextHolder] = notification.useNotification();

  //// rto case handle
  const openNotification = () => {
    api.open({
      message: "RTO Initated !",
      description: `
        RTO for AWB ${obj.awb}
        has been initiated.`,
    });
  };
  const initiateRto = () => {
    confirm({
      title: "Confirm RTO Initiate",
      content: "Are you sure you want to initiate RTO for this Shipment?",
      onOk: async () => {
        try {
          let payload = {
            awb: obj?.awb,
            storeid: obj?.store_id["$oid"],
          };
          const data = await initiateRTo(payload);
          openNotification();
          fetchData();
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  //// move to calling
  const movedToCalling = async () => {
    try {
      let payload = {
        awb: obj?.awb,
        storeid: obj?.store_id["$oid"],
      };
      const result = await moveToCallingAPI(payload);
      fetchData();
    } catch (error) {
      message.error(error.message);
    }
  };

  //handle dropdown change

  const handlemenuItemClick = (e) => {
    if (e.key == 2) {
      initiateRto();
    }
    if (e.key == 0) {
      movedToCalling();
    }
    if (e.key == 1) {
      setModal({
        open: true,
        currentModal: "NDRReattemptModal",
        data: obj,
      });
    }
    if (e.key == 3) {
      setModal({
        open: true,
        currentModal: "escalationModal",
        data: obj,
      });
    }
  };
  const placeAction = {
    items: [
      { label: "Re-Attempt", key: 1 },
      { label: "Initiate RTO", key: 2 },
      { label: "Escalate Or Re-Attempt", key: 3 },
    ],
    onClick: handlemenuItemClick,
  };
  if (obj.ndr_status !== "ndr_calling") {
    placeAction?.items?.unshift({
      label: "Move to Calling",
      key: 0,
    });
  }

  return (
    <div
      className="action-col-container"
      style={{
        height: colHeight,
      }}
    >
      {contextHolder}
      {obj?.status == "delivered" || obj?.status == "rto" ? (
        "N/A"
      ) : (
        <Dropdown.Button
          menu={placeAction}
          placement="bottomLeft"
          width="100%"
          //  open
          icon={<Arrow />}
          autoAdjustOverflow={true}
          autoFocus={true}
          overlayClassName="ndr-actions-single-container"
          className={
            recommendeActions[obj?.recommended_ndr_action].key == 3
              ? "ndr-actions-single-dropdown-container ndr-actions-single-dropdown-container-customheight"
              : "ndr-actions-single-dropdown-container"
          }
          onClick={() => {
            handlemenuItemClick({
              key: recommendeActions[obj?.recommended_ndr_action].key,
            });
          }}
        >
          {recommendeActions[obj?.recommended_ndr_action].label}
        </Dropdown.Button>
      )}

      <div className="row-container">
        <span className="heading">Remaining NDR Reattempts: </span>
        <span className="ndr-attempt-count">
          {obj.remaining_reattemptCount}/3
        </span>
      </div>
    </div>
  );
};
