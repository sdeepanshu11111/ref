import { Button, message, Tag } from "antd";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { updateTagsApi } from "../../Apis/updateTags";
import { CloseIcon, SaveChangeIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import "./index.scss";

export const UpdateTagsModal = ({ onClose }) => {
  const { modal, setOrders } = useContext(OrdersContext);

  const [tags, setTags] = useState([...modal.data.order_tags]);
  const [currentTags, setCurrentTags] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const orderid = modal?.data?._id?.$oid;
  const storeid = modal?.data?.order_storeid?.$oid;
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleAddTag = () => {
    let add = input.split(",");
    setCurrentTags([...currentTags, ...add.filter((t) => t !== "")]);
    setInput("");
  };
  const handleTagClose = (e, tag) => {
    e.preventDefault();
    let newArr = tags.filter((t) => tag !== t);
    setTags([...newArr]);
  };
  const handleCurrentTagClose = (e, tag) => {
    e.preventDefault();
    let newArr = currentTags.filter((t) => tag !== t);
    setCurrentTags([...newArr]);
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateTagsApi(storeid, orderid, [
        ...currentTags,
        ...tags,
      ]);

      setOrders((pre) => {
        let index = pre.findIndex((order) => order._id?.$oid == orderid);

        let arr = [...pre];

        arr[index].order_tags = [...currentTags, ...tags];

        return arr;
      });
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="updateNoteModal">
      {" "}
      <HeaderSection onClose={onClose} headingText="Update Tags" />
      <OrderInfo obj={modal?.data} />
      <div className="tagAreaContainer">
        {tags.map((tag, key) => {
          return (
            <Tag
              key={key}
              className="tag old-tag"
              closeIcon={
                <span className="icon-container">
                  <CloseIcon />
                </span>
              }
              onClose={(e) => handleTagClose(e, tag)}
            >
              {tag}
            </Tag>
          );
        })}
        {currentTags.map((tag, key) => {
          return (
            <Tag
              key={key}
              className="tag current-tag"
              closeIcon={
                <span className="icon-container">
                  <CloseIcon />
                </span>
              }
              onClose={(e) => handleCurrentTagClose(e, tag)}
            >
              {tag}
            </Tag>
          );
        })}
      </div>
      <div className="note-text-area-container">
        {" "}
        <GlobalCustomTextArea
          placeholder={"Enter multiple tags separated by comma"}
          label={"Enter New Tags"}
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="footer-container">
        <Button
          type="primary"
          className="submit-btn"
          disabled={!input}
          onClick={handleAddTag}
        >
          {" "}
          Add New Tag(s)
        </Button>
        <Button
          type="primary"
          className="save-btn"
          onClick={handleSave}
          loading={loading}
        >
          {" "}
          <SaveChangeIcon /> Save Changes
        </Button>
      </div>
    </div>
  );
};
