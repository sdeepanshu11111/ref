import React from "react";
import { LinkIcon } from "../../Icons";
import "./index.scss";
export const Card = ({
  headingIcon,
  heading,
  info,
  type,
  bottomBar,
  mode = "pending",
}) => {
  return (
    <div className={`step-card  ${type + "card"} ${mode + "card"}`}>
      <div className="icon-container">{headingIcon}</div>
      <div className="card-heading">{heading}</div>
      <div className={`info-container ${mode == "completed" && "info-completed"}`}>{info}</div>
      {bottomBar}
      {
        (mode == "pending" ? (
          <div className="labelpending">Pending </div>
        ) : (
          <div className="labelcomplete">Completed </div>
        ))
      }
    </div>
  );
};
