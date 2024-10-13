import { Button } from "antd";
import React from "react";
import { CrossEyeIcon, GreenEyeIcon } from "../../../../../Icons";

export const EyeSection = ({ data, index, setPreferenceModal }) => {
  const handleClick = () => {
    setPreferenceModal((pre) => {
      let arr = [...pre];
      arr[index].visible = !arr[index].visible;
      return arr;
    });
  };

  if (
    data.headingPreference == "Order Details" ||
    data.headingPreference == "Actions"
  ) {
    return <span></span>;
  }

  return (
    <>
      {!data.visible ? (
        <Button
          type="text"
          icon={<span className="icon-container">{<CrossEyeIcon />}</span>}
          size="large"
          className="left-btn"
          onClick={handleClick}
        />
      ) : (
        <Button
          type="text"
          icon={<span className="icon-container">{<GreenEyeIcon />}</span>}
          size="large"
          className="left-btn"
          onClick={handleClick}
        />
      )}
    </>
  );
};
