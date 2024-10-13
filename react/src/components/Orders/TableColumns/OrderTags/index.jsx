import { Button } from "antd";
import React, { useContext } from "react";
import { TagsEditIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
export const OrderTags = ({ obj, colHeight }) => {
  const { setModal } = useContext(OrdersContext);
  const handleOpenAddTag = () => {
    setModal({
      open: true,
      currentModal: "updateTagModal",
      data: obj,
    });
  };

  return (
    <div
      className="order-tags-col-container"
      style={{
        height: colHeight,
      }}
    >
      <div className="item-1">
        <div className="tags-container">
          {obj?.order_tags?.map((tag, key) => {
            return (
              <div key={key} className="tag-container">
                {tag}
              </div>
            );
          })}
          {obj?.order_tags?.length == 0 &&  <span className="tag-placeHolder">No tags added</span>}
        </div>
      </div>
      <div className="tag-btn-container">
        <Button type="text" onClick={handleOpenAddTag}>
          {" "}
          <span className="icon-container">
            <TagsEditIcon />
          </span>{" "}
          Update Tag(s)
        </Button>
      </div>
    </div>
  );
};
