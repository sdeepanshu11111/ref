import React from "react";
import "./index.scss";

import { Button, Timeline } from "antd";

export const OrderTimeLine = ({ obj, colHeight }) => {
  return (
    <div
      className="order-timelime-col"
      style={{
        height: colHeight,
      }}
    >
      <Timeline
        items={obj?.order_timeline?.map((event, index) => {
          return {
            dot:
              obj.order_timeline.length == index + 1 ? (
                <span className="dot-current"></span>
              ) : (
                <span className="dot"></span>
              ),
            children: (
              <div>
                <div>{event.text}</div>
                <div>{event.date}</div>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};
