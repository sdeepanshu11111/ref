import React, { useContext } from "react";
import "./index.scss";
import { Button, Tooltip, Flex } from "antd";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { SearchIcon } from "../../../assets/Icons/SearchIcon";
import { BulkSearchIcon } from "../../../assets/Icons/BulkSearchIcon";

import Search from "antd/es/input/Search";

import OrdersContext from "../NDRContext";
import { BulkSearchBar } from "./BulkSearchBar";
import GlobalDatePicker from "../../GlobalCompoents/GlobalDatePicker";

export const HeaderBar = () => {
  const {
    currentPage,
    currentTab,
    setCurrentTab,
    setModal,
    filters,
    setFilters,
    fetchData,
    search,
    setSearch,
    dateRange,
    setDateRange,
  } = useContext(OrdersContext);
  const { bulkSearch = [] } = filters;

  if (currentPage === "ordersSummary") {
    return;
  }

  const handleBulkSearchOpen = () => {
    setModal({
      open: true,
      currentModal: "bulkSearchModal",
      data: {},
    });
  };
  const onBulkChange = (e) => {
    if (e.key === "2") {
      setModal({
        open: true,
        currentModal: "bulkAddNote",
        data: {},
      });
    }
    if (e.key === "1") {
      setModal({
        open: true,
        currentModal: "bulkUpdateCSV",
        data: {},
      });
    }
    if (e.key === "3") {
      setModal({
        open: true,
        currentModal: "bulkAddTags",
        data: {},
      });
    }
    if (e.key === "4") {
      setModal({
        open: true,
        currentModal: "bulkPlaceOrderviaCSV",
        data: {},
      });
    }
  };
  return (
    <div className="orderpage-header-bar">
      {bulkSearch.length ? (
        <BulkSearchBar />
      ) : (
        <Flex gap={10} justify="flex-start">
          <motion.div
            className="left"
            initial={{ opacity: 0, x: -50 }} // Initial animation properties
            animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
            exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="search-with-bulk">
              <Search
                placeholder="Search by VF Order ID, Store Order ID, AWB or Product Name"
                allowClear={false}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onSearch={() => fetchData()}
                className="search-button"
                enterButton={
                  <div>
                    {" "}
                    <span className="searchicon-container">
                      <SearchIcon />
                    </span>
                    Search
                  </div>
                }
                size="large"
                // onSearch={onSearch}
              />
              <Tooltip
                title="Bulk Search"
                rootClassName="bulk-order-tooltip"
                placement="topLeft"
              >
                <Button
                  type="primary"
                  icon={<BulkSearchIcon />}
                  size="large"
                  onClick={handleBulkSearchOpen}
                />
              </Tooltip>
            </span>
          </motion.div>   
        </Flex>
      )}
      <motion.div
        initial={{ opacity: 0, x: +500 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
        exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <GlobalDatePicker
          showText={true}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </motion.div>
    </div>
  );
};
