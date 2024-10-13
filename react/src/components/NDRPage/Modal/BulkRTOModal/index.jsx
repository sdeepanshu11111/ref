import { Button, message } from "antd";
import React, { useContext } from "react";
import { bulkActionApi } from "../../Apis/shipmentBulkActionApi";
import NDRContext from "../../NDRContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";

export const BulkRTOModal = ({ onClose }) => {
  const { orders, fetchData } = useContext(NDRContext);
  const handleClick = () => {
    let awbOBJ = {};
    console.log(orders);
    orders.forEach((obj) => {
      if (obj.items[0]?.selected) {
        awbOBJ[obj.awb] = obj?.store_id["$oid"];
      }
    });
    try {
      let payload = {
        action: "initiate_rto",
        awbs: awbOBJ,
      };
      let result = bulkActionApi(payload);

      message.success(result.msg);
      fetchData();
      onClose();
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="ndrpage-bulkRTO-modal">
      {" "}
      <HeaderSection onClose={onClose} headingText="Bulk RTO" />
      <Button onClick={handleClick}>Continue</Button>
    </div>
  );
};
