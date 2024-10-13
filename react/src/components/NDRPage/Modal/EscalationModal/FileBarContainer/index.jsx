import { Button } from "antd";
import React from "react";
import { ClipContainer, DeleteIcon } from "../../../Icons";
import "./index.scss";
export const FileBarContainer = ({ file, index, setUploadFile }) => {
  const handleClick = () => {
    setUploadFile((pre) => {
      let arr = [...pre];
      arr.splice(index, 1);
      return arr;
    });
  };
  return (
    <div className="file-bar-container">
      <div>
        <ClipContainer />
      </div>
      <div className="file-name"> {file.name}</div>
      <div className="delete-icon-container">
        <Button
          icon={<DeleteIcon />}
          type="text"
          className="delete-icon-btn"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
