import React, { useContext, useState } from "react";
import "./index.scss";
import { Button, Dropdown, Tooltip, Flex, message } from "antd";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { SearchIcon } from "../../../assets/Icons/SearchIcon";
import { BulkSearchIcon } from "../../../assets/Icons/BulkSearchIcon";
import { BulkActionIcon } from "../../../assets/Icons/BulkActionIcon";
import Search from "antd/es/input/Search";
import { items } from "./constants.jsx";
import Arrow from "../../../assets/Icons/Arrow";
import OrdersContext from "../OrdersContext";
import { BulkSearchBar } from "./BulkSearchBar";
import GlobalDatePicker from "../../GlobalCompoents/GlobalDatePicker";
import getShipment from "../Apis/getShipment.js";
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
    selectedStoreIds,
    pagination,
    sort,
  } = useContext(OrdersContext);
  const { bulkSearch = [] } = filters;
  const [csvLoading, setCsvLoading] = useState(false);

  const downloadCsv = async () => {
    const apiPayload = {
      downloadcsv: 1,
      page: currentPage,
      page_type: currentTab,
      filters: { ...filters, search, ...dateRange },
      storeids: selectedStoreIds,
      page_no: pagination?.page_no,
      limit: pagination?.limit,
      sort: sort,
    };

    setCsvLoading(true);

    try {
      const { msg } = await getShipment(apiPayload);
      message.success(msg);
    } catch (error) {
      message.error(error.message || "An error occurred while fetching data");
    } finally {
      setCsvLoading(false);
    }
  };

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
  };
  return (
    <div className="shipment-header-bar">
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
                placeholder="Search Shipments"
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
          {/* <motion.div
            className="left"
            initial={{ opacity: 0, x: -50 }} // Initial animation properties
            animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
            exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span>
              {" "}
              <Dropdown
                menu={{
                  items,
                  onClick: onBulkChange,
                }}
                placement="bottomLeft"
                arrow
                overlayClassName="bulk-options-container"
                className="bulk-actions-dropdown-container"
              >
                <Button>
                  {" "}
                  <span className="first-icon-container">
                    <BulkActionIcon />
                  </span>{" "}
                  Bulk Actions{" "}
                  <span className="sec-icon-container">
                    <Arrow />
                  </span>
                </Button>
              </Dropdown>
            </span>
          </motion.div> */}
        </Flex>
      )}
      <Button
        className="export"
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
        Export
      </Button>
    </div>
  );
};
