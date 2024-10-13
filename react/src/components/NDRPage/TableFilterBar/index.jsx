import React, { useContext } from "react";
import "./index.scss";
import { Button, Dropdown, Tooltip } from "antd";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { FilterIcon } from "../../../assets/Icons/FilterIcon";
import { FilterLine } from "../../../assets/Icons/FilterLine";
import { GreenTickIcon } from "../../../assets/Icons/GreenTickIcon";

import { selectedShipmentsWithSelectedLineItems } from "../Functions/ordersHelperFunctions";
import Arrow from "../../../assets/Icons/Arrow";
import OrdersContext from "../NDRContext";
import { useState } from "react";

const TableHeader = () => {
  const {
    currentPage,
    orders,
    setOrderActionModal,
    setModal,
    filters,
    savedFilters,
    currentTab,
    setSavedFilters,
    setFilters,
    selectedSavedFilter,
    setSelectedSavedFilter,
    preference,
    setPreference,
    selectedSavedPreference,
    setSelectedSavedPreference,
    savedPreferences,
  } = useContext(OrdersContext);

  const selectedData = selectedShipmentsWithSelectedLineItems(orders);

  const placeAction = {
    items: [
      { label: <div className="bulk-item">RTO</div>, key: 0 },
      { label: <div className="bulk-item">Re-Attempt Delivery</div>, key: 1 },
    ],
    onClick: (e) => {
      if (e?.key == 0) {
        setModal({
          open: true,
          currentModal: "bulkRTOModal",
          data: {},
        });
      }
      if (e?.key == 1) {
        setModal({
          open: true,
          currentModal: "bulkReattemptModal",
          data: {},
        });
      }
    },
  };

  const items = [
    {
      key: "savedFilters",
      label: <div className="bulk-item">View “Saved Filters”</div>,
    },

    {
      key: "11",
      type: "group",
      label: "Apply Saved Filters:",

      children: savedFilters
        .filter((f) => f.visible)
        .map((filter) => {
          return {
            key: filter.key,
            label:
              selectedSavedFilter?.id == filter.id ? (
                <div className="selectedKey cl">
                  {filter.name}
                  <span>
                    <GreenTickIcon />{" "}
                  </span>
                </div>
              ) : (
                <div className="cl">{filter.name}</div>
              ),
          };
        }),
    },
  ];
  const itemsPrefences = [
    {
      key: "savedPreferences",
      label: <div className="bulk-item">View “Saved Preferences”</div>,
    },
    {
      key: "11",
      type: "group",
      label: "Apply Saved Preferences:",

      children: savedPreferences
        .filter((f) => f.visible)
        .map((filter) => {
          return {
            key: filter.key,
            label:
              selectedSavedPreference?.id == filter.id ? (
                <div className="selectedKey cl">
                  {filter.name}
                  <span>
                    <GreenTickIcon />{" "}
                  </span>
                </div>
              ) : (
                <div className="cl">{filter.name}</div>
              ),
          };
        }),
    },
  ];

  const handleAllFilterOpen = () => {
    setModal({
      open: true,
      currentModal: "filterModal",
      data: {
        filters,
        name: "",
        id: "",
        edit: "",
      },
    });
  };
  const handlePreferenceOpen = () => {
    setModal({
      open: true,
      currentModal: "preferencesModal",
      data: {
        preferences: preference,
        name: "",
        id: "",
        edit: "",
      },
    });
  };
  const handleFilterDropdownChange = (e) => {
    if (e.key !== "savedFilters") {
      const selectedFilter = savedFilters.find((f) => {
        return f?.key == e.key;
      });

      setFilters(() => {
        return { ...selectedFilter.filters };
      });
      setSelectedSavedFilter(selectedFilter);
    } else {
      setModal({
        open: true,
        currentModal: "savedFilters",
        data: {},
      });
    }
  };
  const handlePreferenceDropdownChange = (e) => {
    if (e.key !== "savedPreferences") {
      const selectedPer = savedPreferences.find((f) => {
        return f?.key == e.key;
      });

      setPreference(() => {
        return [...selectedPer.preferences];
      });
      setSelectedSavedPreference(selectedPer);
    } else {
      setModal({
        open: true,
        currentModal: "savedPreferences",
        data: {},
      });
    }
  };
  return (
    <div className="table-header-bar">
      <div className="left">
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation properties
          animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
          exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <div className="combo-button-container">
            <Tooltip
              title="All Preferences"
              rootClassName="filter-tooltip"
              placement="topLeft"
            >
              <Button
                type="primary"
                onClick={handlePreferenceOpen}
                icon={
                  <span className="icon-container">
                    <FilterLine />
                  </span>
                }
                size="large"
                className="left-btn"
              />
            </Tooltip>

            <Dropdown
              menu={{
                items: itemsPrefences,
                onClick: handlePreferenceDropdownChange,
              }}
              placement="bottomLeft"
              className="right-btn"
              arrow
              overlayClassName="order-filters-options-container"
            >
              <Button>
                <div className="right">
                  <Arrow />
                </div>
              </Button>
            </Dropdown>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation properties
          animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
          exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <div className="combo-button-container">
            <Tooltip
              title="Apply Filters"
              rootClassName="filter-tooltip"
              placement="topLeft"
            >
              <Button
                type="primary"
                icon={
                  <span className="icon-container">
                    <FilterIcon />
                  </span>
                }
                size="large"
                className="left-btn"
                onClick={handleAllFilterOpen}
              />
            </Tooltip>

            <Dropdown
              menu={{
                items,
                onClick: handleFilterDropdownChange,
              }}
              placement="bottomLeft"
              className="right-btn"
              overlayClassName="order-filters-options-container"
              arrow
              onChange
            >
              <Button>
                <div className="right">
                  <Arrow />
                </div>
              </Button>
            </Dropdown>
          </div>
        </motion.div>
      </div>

      {!!selectedData && selectedData.length > 1 ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation properties
          animate={{ opacity: 1, x: 0 }} // Animation properties to apply on mount
          exit={{ opacity: 0, x: 50 }} // Animation properties to apply on unmount
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Dropdown
            menu={placeAction}
            placement="bottomLeft"
            width="100%"
            arrow
            overlayClassName="bulk-options-custom-container"
            className="bulk-actions-custom-dropdown-container"
          >
            <Button>
              Take Bulk Action{" "}
              <span className="sec-icon-container">
                <Arrow />
              </span>
            </Button>
          </Dropdown>
        </motion.div>
      ) : null}
    </div>
  );
};

export default TableHeader;
