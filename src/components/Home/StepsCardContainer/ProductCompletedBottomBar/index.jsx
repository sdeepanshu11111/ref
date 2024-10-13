import { Button, Dropdown } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../../Icons";
import "./index.scss";
export const ProductCompleteBottombar = () => {
  const menuProps = {
    items: [],
    onClick: () => {},
  };
  const navigate = useNavigate();
  return (
    <div className="productCompleteBottombar">
      <Button
        className="submit-btn"
        onClick={() => navigate("/product-research")}
      >
        Choose another product
      </Button>
      {/* <Dropdown.Button
        menu={menuProps}
        onClick={() => navigate("/product-research")}
        icon={<ArrowIcon />}
      >
        Choose another product
      </Dropdown.Button> */}
    </div>
  );
};
