import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { filterProps } from "framer-motion";
import React from "react";
import { useContext } from "react";
import { TagsEditIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
export const OrderNotes = ({ obj, colHeight }) => {
  const { setModal } = useContext(OrdersContext);
  const handleOpenaddNote = () => {
    setModal({
      open: true,
      currentModal: "addNoteModal",
      data: obj,
    });
  };
  return (
    <div
      className="order-notes-col"
      style={{
        height: colHeight,
      }}
    >
      <div className="notes-list-container">
        {obj?.order_notes
          ?.filter((note) => note.note_type == "note")
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
        {obj?.order_notes?.filter((note) => note.note_type == "note").length ==
          0 && <span className="tag-placeHolder">No note added</span>}
      </div>
      <div className="add-btn-container">
        {" "}
        <Button type="text" onClick={handleOpenaddNote}>
          {" "}
          <span className="icon-container">
            <TagsEditIcon />
          </span>{" "}
          Add Note
        </Button>
      </div>
    </div>
  );
};
