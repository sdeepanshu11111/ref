import { Drawer } from "antd";
import React, { useContext } from "react";
import OrdersContext from "../OrdersContext";
import { currentModalObj } from "./Constants";
import "./index.scss";

export const OrdersPageModal = () => {
  const { modal, setModal } = useContext(OrdersContext);
  const { currentModal } = modal;

  const onClose = () => {
    setModal({
      open: false,
      currentModal: "",
      data: {},
    });
  };

   const CurrentObj = currentModalObj[currentModal];

  return (
    <Drawer
      title={null}
      placement="right"
      width={400}
      closable={false}
      onClose={onClose}
      open={modal.open}
      destroyOnClose={true}
      maskClosable={false}
      //   keyboard={false}
      className="orders-modal"
      rootClassName="orders-modal-root"
    >
      <CurrentObj onClose={onClose} />
  
    </Drawer>
  );
};
