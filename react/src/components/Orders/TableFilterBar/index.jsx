import React, { useContext } from "react";
import "./index.scss";
import { Button, Dropdown, Tooltip } from "antd";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { FilterIcon } from "../../../assets/Icons/FilterIcon";
import { FilterLine } from "../../../assets/Icons/FilterLine";
import { GreenTickIcon } from "../../../assets/Icons/GreenTickIcon";

import { selectedOrdersWithSelectedLineItems } from "../Functions/ordersHelperFunctions";
import Arrow from "../../../assets/Icons/Arrow";
import OrdersContext from "../OrdersContext";
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
    filterActive,
  } = useContext(OrdersContext);

  const selectedData = selectedOrdersWithSelectedLineItems(orders);

  const createActionItem = (label, actionModalType, disabled = false) => {
    // Define disabling conditions for each action

    let disableConditions = false;

    let orderStatus = currentTab;

    switch (actionModalType) {
      case "place":
        disableConditions = [
          "cancelled",
          "on_hold",
          "not_linked",
          "verified_ordered",
          "do_not_fulfill",
          "",
        ].includes(orderStatus);
        break;
      case "verify":
        disableConditions = [
          "cancelled",
          "on_hold",
          "do_not_fulfill",
          "not_linked",
          "verified_ordered",
          "verified",
          "",
        ].includes(orderStatus);
        break;
      case "move_to_calling":
        disableConditions = [
          "cancelled",
          "on_hold",
          "do_not_fulfill",
          "not_linked",
          "verified_ordered",
          "calling",
          "",
        ].includes(orderStatus);
        break;

      // here is negative check
      case "move_to_open":
        disableConditions = !["do_not_fulfill", "verified", "calling"].includes(
          orderStatus
        );
        break;
      case "donot_fulfill":
        disableConditions =
          ["cancelled", "not_linked", "verified_ordered", ""].includes(
            orderStatus
          ) || currentTab === "do_not_fulfill";
        break;
      case "hold":
        disableConditions = [
          "on_hold",
          "verified_ordered",
          "cancelled",
          "",
        ].includes(orderStatus);
        break;
      case "unhold":
        disableConditions = orderStatus !== "on_hold";
        break;
      case "cancel":
        disableConditions =
          orderStatus === "cancelled" ||
          orderStatus === "not_linked" ||
          currentTab === "delivered" ||
          currentTab === "returned";
        break;
      default:
        break;
    }

    return {
      key: actionModalType,
      label: (
        <div
          className={`bulk-item${
            disabled || disableConditions ? " disabled" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled && !disableConditions) {
              if (
                actionModalType === "cancel" &&
                currentPage === "in_processing"
              ) {
                setOrderActionModal({
                  open: true,
                  currentModal: "cancel_placed_orders",
                  data: orders,
                });
              } else {
                setOrderActionModal({
                  open: true,
                  currentModal: actionModalType,
                  data: orders,
                });
              }
            }
          }}
        >
          {label}
        </div>
      ),
      disabled: disabled || disableConditions,
    };
  };

  const placeAction = {
    items: [
      createActionItem("Place Orders", "place"),
      createActionItem(
        <div>
          <span>Marks As</span> Verified{" "}
        </div>,
        "verify"
      ),
      createActionItem(
        <div>
          <span>Move To</span> Calling{" "}
        </div>,
        "move_to_calling"
      ),
      createActionItem(
        <div>
          <span>Marks As</span> Do Not Fulfill{" "}
        </div>,
        "donot_fulfill"
      ),
      createActionItem(
        <div>
          <span>Move To</span> On-Hold{" "}
        </div>,
        "hold"
      ),

      createActionItem("Un-Hold", "unhold"),
      createActionItem(
        <div>
          <span>Move To</span> Open{" "}
        </div>,
        "move_to_open"
      ),
      createActionItem("Cancel Orders", "cancel"),
    ],
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
  if (currentPage === "ordersSummary") {
    return;
  }
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
    <div className="table-header-bar orders">
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
                className={
                  filterActive ? "left-btn left-btn-active" : "left-btn"
                }
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
          <Tooltip
            title={
              currentPage === "all" ||
              currentPage === "in_processing" ||
              currentTab === "all" ||
              (currentPage === "closed" && currentTab !== "do_not_fulfill")
                ? "No action can be taken at the moment"
                : null
            }
          >
            <span>
              <Dropdown
                disabled={
                  currentPage === "all" ||
                  currentPage === "in_processing" ||
                  currentTab === "all" ||
                  (currentPage === "closed" && currentTab !== "do_not_fulfill")
                }
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
            </span>
          </Tooltip>
        </motion.div>
      ) : null}
    </div>
  );
};

export default TableHeader;
