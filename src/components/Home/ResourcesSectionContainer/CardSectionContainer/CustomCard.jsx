import React from "react";
import "./index.scss";

const CustomCard = ({  heading, title, button, icon, type }) => {
  return (
    <div className={`custom-card-gt ${type}`}>
      <div className="card-image">{icon}</div>

      <div className="card-inner">
        <div className="inner-text-wraper">
          <h1>{heading}</h1>
          {title}
        </div>

        {button}
      </div>
    </div>
  );
};

export default CustomCard;
