import { Button, DatePicker, message } from "antd";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { bulkActionApi } from "../../Apis/shipmentBulkActionApi";
import NDRContext from "../../NDRContext";
import { HeaderSection } from "../HeaderSection";

import "./index.scss";

export const BulkReattemptModal = ({ onClose }) => {
  const { orders, fetchData } = useContext(NDRContext);
  const [date, setDate] = useState("");
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
        action: "reattampt",
        awbs: awbOBJ,
        date: date,
      };
      let result = bulkActionApi(payload);

      message.success(result.msg);
      fetchData();
      onClose();
    } catch (error) {
      message.error(error.message);
    }
  };
  const disabledDate = (current) => {
    const currentDate = dayjs(current);

    // Disable dates before yesterday
    if (currentDate.isBefore(dayjs().subtract(1, "day").endOf("day"))) {
      return true;
    }

    // Disable dates after 7 days from today
    if (currentDate.isAfter(dayjs().add(7, "days").endOf("day"))) {
      return true;
    }

    // Disable Sundays (JavaScript's getDay returns 0 for Sunday)
    if (currentDate.day() === 0) {
      return true;
    }

    return false;
  };
  return (
    <div className="ndrpage-bulkRTO-modal">
      {" "}
      <HeaderSection onClose={onClose} headingText="Bulk Re-attempt" />
      <DatePicker
        placeholder="Select Date"
        disabledDate={disabledDate}
        onChange={(e, a) => {
          console.log(e, a);
          setDate(a);
        }}
      />
      <Button onClick={handleClick}>Continue</Button>
    </div>
  );
};
