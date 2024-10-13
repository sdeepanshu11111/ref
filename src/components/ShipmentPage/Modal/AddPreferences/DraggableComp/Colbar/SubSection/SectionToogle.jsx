import { Checkbox } from "antd";
import React from "react";

export const SectionToogleContainer = ({
  data,
  index,
  setPreferenceModal,
  tabdata,
  tabIndex,
}) => {
  const handleChange = () => {
    setPreferenceModal((pre) => {
      let arr = [...pre];
      arr[index].subTabArray[tabIndex].visible =
        !arr[index].subTabArray[tabIndex].visible;

      return arr;
    });
  };

  return (
    <div>
      <Checkbox checked={tabdata.visible} onChange={handleChange} />{" "}
      <span className="sub-heading">{tabdata.name}</span>
    </div>
  );
};
