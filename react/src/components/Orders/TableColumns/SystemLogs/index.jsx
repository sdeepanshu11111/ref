import React from "react";
import dayjs from "dayjs";
import { Button, Tooltip } from "antd";
import { TagsEditIcon } from "../../Icons";
import "./index.scss";
export const SystemLogsCol = ({ obj, colHeight }) => {
  return (
    <div
      className="order-logs-col"
      style={{
        height: colHeight,
      }}
    >
      <div className="notes-list-container">
        {obj?.order_notes
          ?.filter((note) => note.note_type !== "note")
          .map((obj, key) => {
            return (
              <div key={key} className="note-container">
                <div className="note">{obj?.note}</div>
                <div className="bottom">
                  <Tooltip title={obj?.addedbyname}>
                    <div className="by">by {obj?.addedbyname}</div>
                  </Tooltip>

                  <div className="on">
                    {dayjs(obj?.date).format("DD MMM,YYYY | HH:mm")}
                  </div>
                </div>
              </div>
            );
          })}
        {obj?.order_notes?.filter((note) => note.note_type !== "note").length ==
          0 && <span className="tag-placeHolder">No system log</span>}
      </div>
    </div>
  );
};
