import { Button, Dropdown } from "antd";
import React from "react";
import { ArrowIcon, ExtenalLink } from "../../Icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProductBottomBar = () => {
  const auth = useSelector((state) => state.auth);
  const openInNewTab = () => {
    window.open("/product-research", "_blank");
  };
  return (
    <div className="card-product-bottom">
      <div className="first-row">
        <Button onClick={openInNewTab} type="primary" className="submit-btn">
          Find Winning Products
          <span className="icon-container">
            <ExtenalLink />
          </span>
        </Button>
      </div>
      <div>
        <div className="sec-row">
          <Button onClick={openInNewTab} className="pr-tool">
            Or, Explore Product Research Tool
          </Button>
        </div>
      </div>
      <div className="third-row">
        <div
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${auth?.auth?.store?.id}?redirect=` +
                auth?.auth?.store?.store_geo +
                `/` +
                auth?.auth?.store?.id +
                `/products/rfq`
            )
          }
        >
          <span className="text">
            {" "}
            Add your own product idea to ask for a quote
          </span>

          <span className="icon-container">
            <ExtenalLink />
          </span>
        </div>
      </div>
    </div>
  );
};
