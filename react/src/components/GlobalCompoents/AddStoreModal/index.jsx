import { Modal } from "antd";
import React, { useState } from "react";
import { Screens } from "./constants";
import "./index.scss";
export const AddStoreModal = ({ open, onClose ,page=""}) => {
  let defaultScreen = "storeType";
  if(page =="shopify"){
    defaultScreen = "shopify";
  }
  if(page == "woocommerce" ){
    defaultScreen = "woocommerce";
  }
  const [currentScreen, setCurrentScreen] = useState(defaultScreen);
  let CurrentScreen = Screens[currentScreen];
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      width="max-content"
      className="add-store-modal"
    >
      <div>
        <CurrentScreen onClose={onClose} setCurrentScreen={setCurrentScreen} />
      </div>
    </Modal>
  );
};
