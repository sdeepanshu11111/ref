import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import OrdersContext from "../OrdersContext";
import { currentModalObj } from "./Constants";
import ModalHeader from "./ModalHeader";
import "./index.scss";

const OrderActionModal = () => {
  const { orderActionModal, setOrderActionModal } = useContext(OrdersContext);
  const { currentModal } = orderActionModal;

  const onClose = () => {
    setOrderActionModal({
      open: false,
      currentModal: "",
      data: {},
    });
  };

  const CurrentObj = currentModalObj[currentModal];

  return (
    <Modal
      title={<ModalHeader currentModal={orderActionModal.currentModal} />}
      footer={null}
      // style={{ height: 550, overflow: "scroll" }}
      width={"85%"}
      closable={true}
      onCancel={() =>
        setOrderActionModal({
          open: false,
          currentModal: "",
          data: {},
        })
      }
      open={orderActionModal.open}
      destroyOnClose={true}
      maskClosable={false}
      className="orders-action-modal"
    >
      <CurrentObj onClose={onClose} />
    </Modal>
  );
};

export default OrderActionModal;
