import React, { useContext, useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion

import OrdersContext from "../../OrdersContext";
import "./index.scss";
import { Button, message, Spin, Tabs } from "antd";
import getOrders from "../../Apis/getShipment";
import { ordersNav } from "./constants";
import { kFormatter } from "../../Functions/ordersHelperFunctions";

const TabsShipment = ({ selectedStoreIds }) => {
  const [csvLoading, setCsvLoading] = useState(false);
  const {
    currentPage,
    currentTab,
    setCurrentTab,
    filters,
    auth,
    search,
    dateRange,
    pagination,
    tabCount,
    loading,
  } = useContext(OrdersContext);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  };

  const downloadCsv = async () => {
    const apiPayload = {
      downloadcsv: 1,
      page: currentPage,
      page_type: currentTab,
      filters: { ...filters, search, ...dateRange },
      storeids: selectedStoreIds,
      page_no: pagination?.page_no,
      limit: pagination?.limit,
      sort: "date-desc",
    };

    setCsvLoading(true);

    try {
      const { msg } = await getOrders(apiPayload);
      message.success(msg);
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setCsvLoading(false);
    }
  };

  const tabItems = ordersNav[currentPage].map((tab) => ({
    key: tab.value,
    label: (
      <div>
        {tab.name}{" "}
        <span
        //  style={{ width: "40px", display: "inline-block" }}
        >
          ({loading ? "..." : kFormatter(tabCount[currentPage][tab.value])})
        </span>
      </div>
    ),
  }));

  return (
    <div className="shipment-tabs-wraper">
      {/* <div className="tabs">
        {ordersNav[currentPage].map((e, i) => (
          <motion.div
            key={e.value}
            initial={{ opacity: 0, x: -50 }} // Initial animation properties
            animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
            exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Button
              onClick={() => setCurrentTab(e.value)}
              type={`${
                e.value === currentTab
                  ? `primary`
                  : `cancel hover-underline-animation`
              }`}
            >
              {e.name}
              {loading
                ? "(...)"
                : "(" + kFormatter(tabCount[currentPage][e?.value]) + ")"}
            </Button>
          </motion.div>
        ))}
      </div> */}

      <Tabs
        activeKey={currentTab}
        items={tabItems}
        onChange={(e) => setCurrentTab(e)}
      />
      {/* <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation properties
        animate={{ opacity: 1, y: 0 }} // Animation properties to apply on mount
        exit={{ opacity: 0, y: 50 }} // Animation properties to apply on unmount
        transition={{
          duration: 0.3,
          delay: ordersNav[currentPage].length * 0.1,
        }}
      >
        <Button
          loading={csvLoading}
          onClick={() => downloadCsv()}
          type="cancel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              id="download_FILL0_wght300_GRAD0_opsz24"
              d="M188-767.958l-4.554-4.554,1.124-1.157,2.63,2.63V-780h1.6v8.96l2.63-2.63,1.124,1.157ZM181.929-764a1.861,1.861,0,0,1-1.368-.56,1.861,1.861,0,0,1-.56-1.368v-2.892h1.6v2.892a.314.314,0,0,0,.1.226.314.314,0,0,0,.226.1h12.144a.314.314,0,0,0,.226-.1.314.314,0,0,0,.1-.226v-2.892H196v2.892a1.861,1.861,0,0,1-.56,1.368,1.861,1.861,0,0,1-1.368.56Z"
              transform="translate(-180.001 779.999)"
              fill="#46415d"
            />
          </svg>
          Download CSV
        </Button>
      </motion.div> */}
    </div>
  );
};
export default TabsShipment;
