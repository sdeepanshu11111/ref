import React, { useContext } from "react";

// import { CODIcon, StoreIcon, SearchFile, PrepaidIcon } from "../../Icons";
import { Checkbox, Flex } from "antd";
import "./index.scss";
import ClickToCopy from "../../../../../../../ClickToCopy";
import { CODIcon, StoreIcon, SearchFile } from "../../../../../../Icons";
import { CopyIcon } from "../../../../../../../NDRPage/Icons";

export const DemoOrderDetails = ({ data }) => {
  return (
    <Flex
      style={{
        height: "160px",
      }}
      className="order-details-cell-demo"
      align="start"
      gap={10}
    >
      <Flex vertical gap={8}>
        <div className="awb-row">
          <h2>
            {data.subTabArray[0]?.visible && (
              <>
                {" "}
                <span>AWB:</span>{" "}
                <span className="awb">
                  <ClickToCopy
                    textToCopy={"123456789"}
                    customIcon={<CopyIcon />}
                  />
                </span>
              </>
            )}
          </h2>
        </div>
        <div className="row_one">
          {data.subTabArray[1]?.visible && (
            <ClickToCopy textToCopy={"VFOD1234"} customIcon={<CopyIcon />} />
          )}

          {data.subTabArray[2]?.visible && (
            <h2>
              <span className="heading1">Store Order: </span>
              <span>
                <ClickToCopy textToCopy={"#12235"} customIcon={<CopyIcon />} />
              </span>{" "}
            </h2>
          )}
        </div>
        <div className="row_two">
          <h1>
            {data.subTabArray[3]?.visible && (
              <>
                <CODIcon />
                COD <div className="vr_line" />
              </>
            )}
            {data.subTabArray[4].visible && <span>₹ 1,650.00</span>}
          </h1>
          {data.subTabArray[5]?.visible && (
            <h2>
              <StoreIcon /> Skimmylo
            </h2>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
