import React from "react";
import "./index.scss";
export const InfoIIcon = () => {
  return (
    <span className="infoIconcontainer">
      <svg
        className="product-tooltip-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 17"
      >
        <g data-name="Group 2529">
          <g transform="translate(0 1)" fill="none" stroke="#898989">
            <circle cx="8" cy="8" r="8" stroke="none" />
            <circle cx="8" cy="8" r="7.5" />
          </g>
          <text
            transform="translate(6.5)"
            fill="#898989"
            fontSize="12"
            fontFamily="Poppins-Medium, Poppins"
            fontWeight="500"
            letterSpacing=".032em"
          >
            <tspan x="0" y="13">
              i
            </tspan>
          </text>
        </g>
      </svg>
    </span>
  );
};
