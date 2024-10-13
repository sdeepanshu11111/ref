import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ExternalLinkIcon } from "../../Icons";
import "./index.scss";
export const MainContainer = ({ list }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="snap-short-recommend-main-container">
      {list.map((item) => {
        const { label, icon, handleClick = () => {} } = item;
        return (
          <div className="item"    onClick={handleClick.bind(this,auth)}>
            <div className="icon-container">{icon}</div>
            <div className="label-container">{label}</div>
            <div>
              {" "}
              <Button
                type="text"
                icon={<ExternalLinkIcon />}
                onClick={handleClick.bind(this,auth)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
