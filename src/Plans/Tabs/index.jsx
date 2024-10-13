import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./index.scss"; // Create and import a CSS file for styling

const Tabs = ({ selectedTab, setSelectedTab, switchStoreData }) => {
  const tabs = ["Monthly", "Quarterly", "Annually"];

  useEffect(() => {
    if (
      switchStoreData?.plan?.current_plan?.interval === "month" &&
      switchStoreData?.plan?.current_plan?.interval_count == 3
    ) {
      return setSelectedTab("Quarterly");
    }

    if (switchStoreData?.plan?.current_plan?.interval === "month") {
      return setSelectedTab("Monthly");
    }

    if (switchStoreData?.plan?.current_plan?.interval === "year") {
      return setSelectedTab("Annually");
    }

    return setSelectedTab("Monthly");
  }, []);

  return (
    <div className="tabs-wraper">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${tab} ${selectedTab === tab ? "selected" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === "Quarterly" ? (
              <div className="ab">(Save 10% quarterly)</div>
            ) : tab === "Annually" ? (
              <div className="ab">(Get 2 months free)</div>
            ) : (
              ""
            )}

            {tab}
            {selectedTab === tab ? (
              <motion.div
                layoutId="underline"
                className="underline"
                initial={false}
                animate={{ backgroundColor: "#fff" }}
                transition={{ duration: 0.3 }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
