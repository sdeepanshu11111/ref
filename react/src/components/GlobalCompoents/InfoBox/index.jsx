import React from "react";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { WhiteArrow } from "../../../assets/Icons/WhiteArrow";
import "./index.scss";
import { Spin, Tooltip } from "antd";

export const InfoBox = ({
  title,
  orders,
  amount,
  backgroundColor,
  borderColor,
  withAfter,
  withAfterGrey,
  withAfterBlue,
  withAfterYellow,
  withBefore,
  detailOpen,
  bottomBar,
  onBottomClick,
  boxType,
  openBoxType,
  divider,
  dividerWidth,
  withBeforeBlue,
  showAmount = true,
  row,
  delay = 0.1,
  deepdownLoading = false,
  titleTooltip = "",
}) => {
  return (
    <motion.div
      className="left"
      initial={{ opacity: 0, x: -500 }} // Initial animation properties
      animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
      exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
      transition={{ duration: 0.3, delay: delay }}
    >
      <div
        className={`infoContainer
       ${withAfter ? "withAfterinfoContainer" : ""} 
        ${withBefore ? "withBeforeinfoContainer" : ""}
        ${withAfterGrey ? "withAfterGrey" : ""}
        ${withAfterYellow ? "withAfterYellow" : ""}
        ${withAfterBlue ? "withAfterBlue" : ""}
        ${borderColor == "#D0CDE0" ? "withBeforeinfoContainergrey" : ""}
        ${borderColor == "#EDDAB0" ? "withBeforeinfoContainerbege" : ""}
        ${borderColor == "#EDC4C4" ? "withBeforeinfoContainerred" : ""}
        ${withBeforeBlue ? "withBeforeinfoContainerblue" : ""}
      
        `}
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          height: bottomBar ? "100px" : "",
        }}
      >
        {divider && (
          <div className={`divider ${dividerWidth}`}>
            {" "}
            {row == "second" && (
              <>
                <div className="secrowfirst"></div>
                <div className="secrowsec"></div>
              </>
            )}{" "}
            {row == "third" && (
              <>
                <div className="thirdrowfirst"></div>
                <div className="thirdrowsec"></div>
                <div className="thirdrowthird"></div>
              </>
            )}
            {row == "forth" && (
              <>
                <div className="forthrowfirst"></div>
                <div className="forthrowsec"></div>
                <div className="forthrowthird"></div>
              </>
            )}
            {row == "fifth" && (
              <>
                <div className="fifthrowfirst"></div>
                <div className="fifthrowsec"></div>
                <div className="fifthrowthird"></div>
              </>
            )}
            {row == "delivered" && (
              <>
                <div className="deliveredfirst"></div>
                <div className="deliveredsec"></div>
              </>
            )}
            {row == "rto" && (
              <>
                <div className="rtofirst"></div>
                <div className="rtosec"></div>
              </>
            )}
            {row == "ndr" && (
              <>
                <div className="ndrfirst"></div>
              </>
            )}
          </div>
        )}
        <div className="heading">{title}</div>
        <div className="info">
          {" "}
          <span className="orders">{orders}</span>{" "}
          {showAmount && (
            <Tooltip
              title={"₹ "+ titleTooltip.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            >
              <span className="amount"> (₹ {amount}) </span>
            </Tooltip>
          )}
        </div>
        {bottomBar ? (
          <div
            className="bottomBar"
            style={{
              backgroundColor: borderColor,
            }}
            onClick={onBottomClick}
          >
            {deepdownLoading ? (
              <Spin size="small" />
            ) : (
              <div
                className={`iconContainer ${
                  openBoxType !== boxType ? "arrow-up" : "arrow-down"
                }`}
              >
                {" "}
                <WhiteArrow />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};
