import { Button, Checkbox, message, Tag } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { FilterIcon } from "../../../../assets/Icons/FilterIcon";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import { saveFilters } from "../../Apis/saveFilters";
import { SaveChangeIcon } from "../../Icons";
import OrdersContext from "../../NDRContext";
import { HeaderSection } from "../HeaderSection";
import {
  paymentTypeOptions,
  shipmentStatusOptions,
  ndrStatusOptions,
  attempsOptions,
  ndrBucketOption,
} from "./constants";
import "./index.scss";

export const FilterModal = ({ onClose }) => {
  const {
    modal,
    filters: mainFilter,
    setFilters: setMainFilter,
    currentPage,
    currentTab,
    fetchSavedFilter,
    selectedSavedFilter,
    setSelectedSavedFilter,
  } = useContext(OrdersContext);
  const [filters, setFilters] = useState({ ...modal.data.filters });
  const [filterName, setFilterName] = useState(modal.data.name);
  const [loading, setLoading] = useState(false);
  const handleApply = () => {
    if (selectedSavedFilter) {
      let obj1 = {
        shipment_status: [...filters?.shipment_status],
        action_status: filters.action_status,
        payment_type: filters.payment_type,
        ndr_bucket: [...filters?.ndr_bucket],
        ndr_count: [...filters?.ndr_count],
      };
      let obj2 = {
        shipment_status: [...selectedSavedFilter?.shipment_status],
        action_status: selectedSavedFilter.action_status,
        payment_type: selectedSavedFilter.payment_type,
        ndr_bucket: [...selectedSavedFilter?.ndr_bucket],
        ndr_count: [...selectedSavedFilter?.ndr_count],
      };
      const jsonString1 = JSON.stringify(obj1);
      const jsonString2 = JSON.stringify(obj2);

      if (jsonString1 !== jsonString2) {
        setSelectedSavedFilter(null);
      }
    }

    setMainFilter((pre) => {
      return {
        ...filters,
      };
    });
  };
  const handleSelectChange = (value, key, objKey = "") => {
    let filtersObj = { ...filters };

    let obj = !objKey ? filtersObj : filtersObj[objKey];

    obj[key] = value;

    setFilters((pre) => {
      return {
        ...pre,
        ...filtersObj,
      };
    });
  };
  const handleLabel = (raw) => {
    let arr = raw.map((obj) => {
      return {
        value: obj.value,
        label: (
          <div>
            <Checkbox /> <span className="label-custom"> {obj.label}</span>
          </div>
        ),
      };
    });
    return arr;
  };
  const handleDropdownRender = (
    menu,
    valueArr,
    optionArr,
    key,
    objKey = null
  ) => {
    const handleClear = () => {
      let filtersObj = { ...filters };

      let obj = !objKey ? filtersObj : filtersObj[objKey];
      obj[key] = [];
      setFilters((pre) => {
        return {
          ...pre,
          ...filtersObj,
        };
      });
    };
    const handleSelectAll = () => {
      let filtersObj = { ...filters };

      let obj = !objKey ? filtersObj : filtersObj[objKey];
      obj[key] = optionArr.map((obj) => obj.value);
      setFilters((pre) => {
        return {
          ...pre,
          ...filtersObj,
        };
      });
    };

    return (
      <div className="">
        {menu}
        {optionArr?.length ? (
          <div className="footer-bar">
            {!valueArr.length ? (
              <Button onClick={handleSelectAll} type="primary">
                {" "}
                Select All{" "}
              </Button>
            ) : (
              <Button onClick={handleClear}> Clear All </Button>
            )}
          </div>
        ) : null}
      </div>
    );
  };
  const tagRender = (props, option) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
      >
        {option.filter((obj) => obj.value == value)[0]?.label}
      </Tag>
    );
  };
  const handleSaveFilter = async () => {
    try {
      const data = {
        page: "ndr",
        page_type: currentTab,
        filters: filters,
        name: filterName,
        id: modal.data.id,
        edit: modal.data.edit,
      };
      setLoading(true);
      const res = await saveFilters(data);
      setMainFilter((pre) => {
        return {
          ...filters,
        };
      });
      fetchSavedFilter();
      setSelectedSavedFilter(null);
      onClose();
    } catch (e) {
      message.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ndrpageFilterContainer">
      <HeaderSection
        onClose={onClose}
        headingText="All Filters"
        headerIcon={<FilterIcon />}
      />
      <div className="filters-main-container">
        <div className="text-filter">Filter By:</div>
        {currentTab !== "pending" && (
          <>
            <GlobalCustomSelect
              label="Shipment Status"
              options={handleLabel(shipmentStatusOptions)}
              placeholder="Select"
              suffixIcon={<Arrow />}
              mode="multiple"
              value={filters.shipment_status}
              maxTagCount={"responsive"}
              tagRender={(e) => tagRender(e, shipmentStatusOptions)}
              onChange={(e) => handleSelectChange(e, "shipment_status")}
              popupClassName="rootOverlay-select-filter-multi"
              dropdownRender={(menu) => {
                return handleDropdownRender(
                  menu,
                  filters.shipment_status,
                  shipmentStatusOptions,
                  "shipment_status"
                );
              }}
            />
            <GlobalCustomSelect
              label="NDR status"
              options={ndrStatusOptions}
              placeholder="Select"
              suffixIcon={<Arrow />}
              value={filters?.action_status}
              onChange={(e) => handleSelectChange(e, "action_status")}
            />
          </>
        )}

        <GlobalCustomSelect
          label={"NDR Bucket"}
          options={handleLabel(ndrBucketOption)}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          value={filters.ndr_bucket}
          mode="multiple"
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, ndrBucketOption)}
          onChange={(e) => handleSelectChange(e, "ndr_bucket")}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.ndr_bucket,
              ndrBucketOption,
              "ndr_bucket"
            );
          }}
        />

        <GlobalCustomSelect
          label="Payment Type"
          options={paymentTypeOptions}
          placeholder="Select "
          suffixIcon={<Arrow />}
          value={filters.payment_type}
          onChange={(e) => handleSelectChange(e, "payment_type")}
        />
        <GlobalCustomSelect
          label={"Delivery Attempts"}
          options={handleLabel(attempsOptions)}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          value={filters.ndr_count}
          mode="multiple"
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, attempsOptions)}
          onChange={(e) => handleSelectChange(e, "ndr_count")}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.ndr_count,
              attempsOptions,
              "ndr_count"
            );
          }}
        />
      </div>
      <div className="apply-btn-container">
        {" "}
        <Button
          type="primary"
          className="submit-btn"
          onClick={() => {
            handleApply();

            onClose();
          }}
        >
          {" "}
          <FilterIcon /> Apply Filters
        </Button>
      </div>

      <div className="footer-container">
        <div className="middle-section">
          <div className="info">
            Or, Save Filters For Quick Access In Future
          </div>
          <div className="input-container">
            <GlobalCustomInput
              addonBefore={"Name *"}
              placeholder={"Please enter a name for your filters"}
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="primary"
          className="save-btn"
          disabled={!filterName}
          onClick={handleSaveFilter}
          loading={loading}
        >
          {" "}
          <SaveChangeIcon /> Save Changes & Apply
        </Button>
      </div>
    </div>
  );
};
