import React from "react";
import { CardSectionContainer } from "./CardSectionContainer";
import { HeadingBar } from "./Headingbar";

import "./index.scss";
export const ResourcesSectionContainer = () => {
  return (
    <div className="resourcesSectionContainer">
      {" "}
      <div className="heading-section">Resources for you</div>
      <HeadingBar />
      <CardSectionContainer />
    </div>
  );
};
