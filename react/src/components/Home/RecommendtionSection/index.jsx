import { Button, Collapse } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowIcon,
  RecommendetionOneIcon,
  RecommendetionThreeIcon,
  RecommendetionTwoIcon,
} from "../Icons";
import {
  RecommendetionOneList,
  RecommendetionthreeList,
  RecommendetionTwoList,
} from "./constants.jsx";
import "./index.scss";
import { MainContainer } from "./MainContainer";
export const RecommendtionSection = () => {
  let text = 1;
  const [activekey, setActiveKey] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <div className="header-container">
          <span className="icon-container">
            <RecommendetionOneIcon />
          </span>
          Source a product for your store
        </div>
      ),
      children: <MainContainer list={RecommendetionOneList} />,
      extra: (
        <div className="extra-data-container">
          {" "}
          <Button
            type="primary"
            className="sub-btn"
            onClick={(event) => {
              event.stopPropagation();

              navigate("/product-research");
            }}
          >
            Start Sourcing {">>"}
          </Button>
          <span className="option">
            {activekey.includes("1") ? "Less Options" : "More Options"}{" "}
            <ArrowIcon />{" "}
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="header-container">
          <span className="icon-container">
            <RecommendetionTwoIcon />
          </span>
          Add product to your store
        </div>
      ),
      children: <MainContainer list={RecommendetionTwoList} />,
      extra: (
        <div className="extra-data-container">
          <Button
            type="primary"
            className="sub-btn"
            onClick={(event) => {
              event.stopPropagation();

              window.location.assign(
                import.meta.env.VITE_REACT_OLD_APP_URL +
                  `/switch-store/${auth?.auth?.store?.id}?redirect=` +
                  auth?.auth?.store?.store_geo +
                  `/` +
                  auth?.auth?.store?.id +
                  `/products/import-list`,
                "_blank"
              );
            }}
          >
            Add Product {">>"}
          </Button>
          <span className="option">
            {activekey.includes("2") ? "Less Options" : "More Options"}{" "}
            <ArrowIcon />{" "}
          </span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="header-container">
          <span className="icon-container">
            <RecommendetionThreeIcon />
          </span>
          Configure your fulfillment & COD operations
        </div>
      ),
      children: <MainContainer list={RecommendetionthreeList} />,
      extra: (
        <div className="extra-data-container">
          <Button
            type="primary"
            className="sub-btn"
            onClick={(event) => {
              event.stopPropagation();
              window.location.assign(
                import.meta.env.VITE_REACT_OLD_APP_URL +
                  `/switch-store/${auth?.auth?.store?.id}?redirect=` +
                  auth?.auth?.store?.store_geo +
                  `/` +
                  auth?.auth?.store?.id +
                  `/settings`,
                "_blank"
              );
            }}
          >
            Start Configuring {">>"}
          </Button>
          <span className="option">
            {activekey.includes("3") ? "Less Options" : "More Options"}{" "}
            <ArrowIcon />{" "}
          </span>
        </div>
      ),
    },
  ];
  const onChange = (key) => {
    setActiveKey(key);
  };
  return (
    <div className="recommentedSectionContainer">
      <div className="heading-section">Recommended Next Steps</div>
      <div>
        <Collapse
          items={items}
          onChange={onChange}
          activekey={activekey}
          expandIconPosition="end"
          expandIcon={() => null}
          rootClassName="collapse-class"
        />
      </div>
    </div>
  );
};
