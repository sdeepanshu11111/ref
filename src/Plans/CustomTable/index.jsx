import { Tooltip } from "antd";
import React from "react";

import RightTick from "../../assets/Icons/RightTick";
import WrongTick from "../../assets/Icons/WrongTick";

import "./index.scss";
import { InfoIIcon } from "../../components/InfoIIcon";
const CustomTable = ({
  data = [],
  header = "",
  footer = null,
  switchStoreData,
}) => {
  return (
    <div className="custom-table">
      {!!header && header}

      {data.map((row, index) => (
        <Row
          paidPlan={switchStoreData?.plan?.current_plan?.plan_type}
          key={index}
          row={row}
        />
      ))}

      {!!footer && footer}
    </div>
  );
};

const Row = ({ row, paidPlan }) => {
  const textHandler = (text) => {
    if (text === true) {
      return <RightTick />;
    }

    if (text === false) {
      return <WrongTick />;
    }

    return text;
  };

  return (
    <div className="table-row">
      <div className="table-cell left">
        {row.Features}
        <Tooltip title={row.tooltipTitle}>
          <span className="i-icon-container">
            <InfoIIcon />
          </span>
        </Tooltip>
      </div>

      {paidPlan !== "paid" && (
        <div className="table-cell">{textHandler(row.Free)} </div>
      )}

      <div className="table-cell">{textHandler(row.Mover)}</div>
      <div className="table-cell">{textHandler(row.Shaker)}</div>
      <div className="table-cell right">{textHandler(row.EarthQuaker)}</div>
    </div>
  );
};

export default CustomTable;
