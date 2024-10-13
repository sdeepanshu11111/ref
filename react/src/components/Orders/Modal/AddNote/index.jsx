import { Button, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { addNoteApi } from "../../Apis/addNote";
// import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";
export const AddNoteModal = ({ onClose }) => {
  const { modal, orders, setOrders, auth } = useContext(OrdersContext);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [noteArr, setNoteArr] = useState(modal.data.order_notes);

  const orderid = modal?.data?._id?.$oid;
  const storeid = modal?.data?.order_storeid?.$oid;
  const handleAddNote = async () => {
    try {
      setLoading(true);
      const res = await addNoteApi(storeid, orderid, note);
      setNote("");
      const currentNote = res.note;
      currentNote.new = 1;
      setNoteArr((pre) => {
        return [currentNote, ...pre];
      });

      setOrders((pre) => {
        let index = pre.findIndex((order) => order._id?.$oid == orderid);

        let arr = [...pre];

        arr[index].order_notes = [res.note, ...arr[index].order_notes];

        return arr;
      });
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addNoteModal">
      {" "}
      <HeaderSection onClose={onClose} headingText="Add New Note" />
      <OrderInfo obj={modal.data} />
      <div className="note-text-area-container">
        {" "}
        <GlobalCustomTextArea
          placeholder={"Enter text here for your note"}
          label={"Add New Note"}
          value={note}
          onChange={(e) => {
            setNote(() => e.target.value);
          }}
        />
      </div>
      <div className="footer-container">
        <Button
          type="primary" 
          className="submit-btn"
          onClick={handleAddNote}
          loading={loading}
          disabled={!note}
        >
          {" "}
          Add Note
        </Button>
      </div>
      <div>
        <div className="heading-bar-container">
          <div className="text item-1">All Notes</div>
          <div className="item-2"></div>
        </div>
        <div>
          {noteArr.length ? (
            <div className="notes-list-container">
              {noteArr.map((obj, index) => {
                return (
                  <div
                    key={index}
                    className={
                      obj?.new
                        ? "note-container note-container-new"
                        : "note-container"
                    }
                  >
                    <div className="note">{obj?.note}</div>
                    <div className="bottom">
                      <div className="by">by {obj?.addedbyname}</div>
                      <div className="on">
                        {dayjs(obj?.date).format("DD MMM,YYYY | HH:mm")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-notes">No notes to show</div>
          )}
        </div>
      </div>
    </div>
  );
};
