import React from "react";

import RightTick from "../../assets/Icons/RightTick";
import WrongTick from "../../assets/Icons/WrongTick";

import "./index.scss";

const CustomTableHorizontal = ({
  data = [],
  header = "",
  footer = null,
  switchStoreData,
}) => {
  return (
      ["Free","Mover","Shaker","EarthQuaker"].map(function(ptype){
        return (
        <div className={`custom-table-horizontal ${ptype}`}>
          {!!header && header}

          {data.map((row, index) => (
            <Row
              paidPlan={switchStoreData?.plan?.current_plan?.plan_type}
              key={index}
              row={row}
              ptype={ptype}
            />
          ))}

          {!!footer && footer}
        </div>
        );
      })
  );
};

const Row = ({ row, paidPlan,ptype }) => {
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
      <div className="table-cell left">{row.Features}</div>
{/* 
      {paidPlan !== "paid" && (
        <div className="table-cell">{textHandler(row.Free)}</div>
      )} */}

      <div className="table-cell">{textHandler(row[ptype])}</div>
      {/* <div className="table-cell">{textHandler(row.Shaker)}</div>
      <div className="table-cell right">{textHandler(row.EarthQuaker)}</div> */}
    </div>
  );
};

export default CustomTableHorizontal;
