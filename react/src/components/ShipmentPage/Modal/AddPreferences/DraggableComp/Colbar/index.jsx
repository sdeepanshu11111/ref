import { Button } from "antd";
import React, { useState } from "react";
import {
  DownIcon,
  DragIcon,
  EyeIcon,
  GreenEyeIcon,
  PinIcon,
} from "../../../../Icons";
import { EyeSection } from "./EyeSection";
import "./index.scss";
import { SubSection } from "./SubSection";
export const Colbar = ({ data, index, setPreferenceModal }) => {
  const handleClick = () => {
    setPreferenceModal((pre) => {
      let arr = [...pre];
      let s = arr.map((obj) => {
        if (obj.subtab && obj.open) {
          obj.open = false;
        } else {
          if (obj.subtab) {
            obj.open = false;
          }
          if (obj.headingPreference === data.headingPreference) {
            obj.open = true;
          }
        }

        return obj;
      });

      return s;
    });
  };
  return (
    <div className="colbar-container">
      <div
        className={
          data.open ? "main-bar-container custom-radius" : "main-bar-container"
        }
      >
        <div className="left">{data.headingPreference}</div>
        <div className="right">
          <div className="item">
            {" "}
            <EyeSection
              data={data}
              index={index}
              setPreferenceModal={setPreferenceModal}
            />
          </div>
          <div className="item ">
            {data.headingPreference == "Shipment Details" ||
            data.headingPreference == "Actions" ? (
              <span className="pin">
                <PinIcon />
              </span>
            ) : (
              <span className="drag">
                <DragIcon />
              </span>
            )}
          </div>
          <div className="item">
            {" "}
            {data.subtab && data?.headingPreference !== "Product Details" ? (
              <Button
                type="text"
                //   loading={loading}
                icon={
                  <span
                    className={
                      data.open
                        ? "icon-container open-icon-container"
                        : "icon-container"
                    }
                  >
                    {<DownIcon />}
                  </span>
                }
                size="large"
                className="left-btn"
                onClick={handleClick}
              />
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
      {data?.open ? (
        <SubSection
          data={data}
          index={index}
          setPreferenceModal={setPreferenceModal}
        />
      ) : null}
    </div>
  );
};
