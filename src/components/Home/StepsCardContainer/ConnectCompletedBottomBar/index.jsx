import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import { AddStoreModal } from "../../../GlobalCompoents/AddStoreModal";
import { ArrowIcon } from "../../Icons";
import "./index.scss";
export const ConnectCompletedBottombar = () => {
  const menuProps = {
    items: [],
    onClick: () => {},
  };
  const [addStoreData, setaddStoreData] = useState({
    open: false,
    page:""
  });
  const handleClick = () => {
    setaddStoreData((pre) => {
      return {
        ...pre,
        open: true,
      };
    });
  };
  return (
    <div className="connectCompletedBottombar">
      <Button className="submit-btn" 
      onClick={handleClick}>
        Connect another store
      </Button>
      {/* <Dropdown.Button
        menu={menuProps}
        onClick={handleClick}
        icon={<ArrowIcon />}
      >
        Connect another store
      </Dropdown.Button> */}
      {addStoreData.open && (
        <AddStoreModal
          open={addStoreData.open}
          onClose={() => setaddStoreData((pre) => ({ ...pre, open: false }))}
        />
      )}
    </div>
  );
};
