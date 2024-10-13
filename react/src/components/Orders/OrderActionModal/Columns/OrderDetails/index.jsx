import React, { useContext } from "react";
import OrdersContext from "../../../OrdersContext";
import { CODIcon, StoreIcon, SearchFile, PrepaidIcon } from "../../../Icons";
import { Checkbox, Flex, Spin } from "antd";
import ClickToCopy from "../../../../ClickToCopy";

import "./index.scss";
import { CopyIcon } from "../../../../NDRPage/Icons";

export const OrderDetails = ({
  obj,
  colHeight,
  showCheckBox = false,
  loading,
  setSelectableData,
  selectableData,
  disabledCheckBox,
}) => {
  const { auth } = useContext(OrdersContext);

  const handleCheckboxChange = (e, obj) => {
    setSelectableData(
      selectableData.map((o) => {
        if (o._id.$oid === obj._id.$oid) {
          o.confrimSelected = e.target.checked;
        }
        return o;
      })
    );
  };
  const rtoRiskChecker = (score) => {
    try {
      if (score < 50) {
        return (
          <>
            {" "}
            <div className="color-circle red"> </div> High RTO Risk
          </>
        );
      }

      if (score > 50 && score < 70) {
        return (
          <>
            {" "}
            <div className="color-circle yellow"> </div> Moderate RTO Risk{" "}
          </>
        );
      }

      if (score > 70) {
        return (
          <>
            <div className="color-circle green"> </div> Low RTO Risk{" "}
          </>
        );
      }
    } catch (error) {}
  };
  return (
    <Flex
      style={{
        height: colHeight,
      }}
      className="order-details-cell-action"
      align="start"
      gap={10}
    >
      {disabledCheckBox && <Checkbox disabled />}

      {showCheckBox ? (
        loading ? (
          <Spin />
        ) : (
          <Checkbox
            checked={obj.confrimSelected}
            onChange={(e) => handleCheckboxChange(e, obj)}
          />
        )
      ) : null}

      <Flex vertical gap={8}>
        <div className="row_one">
          <h1>
            <ClickToCopy
              textToCopy={obj?.order_vfid}
              customIcon={<CopyIcon />}
            />
          </h1>
          <h2>
            <span className="heading">Store Order: </span>
            <span>
              <ClickToCopy textToCopy={obj?.order_shopify?.name} />
            </span>{" "}
          </h2>
          <div className="row_three">{rtoRiskChecker(obj.score)}</div>
          <div></div>
        </div>
      </Flex>
    </Flex>
  );
};
