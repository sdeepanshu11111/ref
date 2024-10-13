import React, { useContext } from "react";

// import { CODIcon, StoreIcon, SearchFile, PrepaidIcon } from "../../Icons";
import { Checkbox, Flex } from "antd";
import "./index.scss";
import ClickToCopy from "../../../../../../../ClickToCopy";
import {
  CODIcon,
  StoreIcon,
  SearchFile,
  CopyIcon,
} from "../../../../../../Icons";
import moment from "moment";

export const DemoOrderDetails = ({ data }) => {
  return (
    <div
      style={{
        // height: "280px",
      }}
      className="ndr-order-details-cell-demo"
      align="start"
      gap={10}
    >
      <Flex vertical gap={8}>
        <div className="row_one">
          {data.subTabArray[0].visible && (
            <h2>
              <span className="heading">AWB: </span>
              <span className="value">81709572674</span>{" "}
            </h2>
          )}

          {data.subTabArray[1].visible && (
            <h1>Packed On {moment().format("DD MMM, YYYY")} </h1>
          )}
        </div>
        <div className="row_two">
          {data.subTabArray[2].visible && (
            <div className="vfpd-container">VFOD1514062</div>
          )}
          {data.subTabArray[3].visible && (
            <h1>
              <span className="heading">Store Order: </span>
              <span>
                <ClickToCopy textToCopy={"#12235"} customIcon={<CopyIcon />} />
              </span>{" "}
            </h1>
          )}

          <h1 className="hj">
            {data.subTabArray[4].visible && (
              <>
                <CODIcon />
                COD <div className="vr_line" />
               
              </>
            )}
            {data.subTabArray[5].visible &&   <div className="order-value-container">₹ 1,650.00</div>}
            
          
          </h1>
          {data.subTabArray[6].visible && (
            <h2 className="store-name-container">
              <StoreIcon /> Skimmylo
            </h2>
          )}
        </div>
      </Flex>
    </div>
  );
};
