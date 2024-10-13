import { Button, Checkbox, message, Tag } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { FilterIcon } from "../../../../assets/Icons/FilterIcon";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import { saveFilters } from "../../Apis/saveFilters";
import { SaveChangeIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import {
  paymentTypeOptions,
  remittanceStatusOptions,
  shipmentStatusOptions,
} from "./constants.jsx";
import "./index.scss";

export const FilterModal = ({ onClose }) => {
  const {
    modal,
    setFilters: setMainFilter,
    miscellaneousData,
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
        serviceability: filters.serviceability,
        order_tags: [...filters.order_tags],
        order_duplication: filters.order_duplication,
        payment_type: filters.payment_type,
        rto_risk_indicator: [...filters.rto_risk_indicator],
        address_quality_metrics: [...filters.address_quality_metrics],
        vf_product_name: [...filters.vf_product_name],
        shopify_product_name: [...filters.shopify_product_name],
      };
      let obj2 = {
        serviceability: selectedSavedFilter.filters.serviceability,
        order_tags: [...selectedSavedFilter.filters.order_tags],
        order_duplication: selectedSavedFilter.filters.order_duplication,
        payment_type: selectedSavedFilter.filters.payment_type,
        rto_risk_indicator: [...selectedSavedFilter.filters.rto_risk_indicator],
        address_quality_metrics: [
          ...selectedSavedFilter.filters.address_quality_metrics,
        ],
        vf_product_name: [...selectedSavedFilter.filters.vf_product_name],
        shopify_product_name: [
          ...selectedSavedFilter.filters.shopify_product_name,
        ],
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
  const handleLabel = (raw,custom=false) => {
    let arr = raw.map((obj) => {
      return {
        value: obj.value,
        label: (
          <div>
            <Checkbox /> <span className="label-custom"> {custom && "("+obj.value+")"} {obj.label}</span>
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
        page: currentPage,
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
    <div className="shipmentFilterContainer">
      <HeaderSection
        onClose={onClose}
        headingText="All Filters"
        headerIcon={<FilterIcon />}
      />
      <div className="filters-main-container">
        {/* <GlobalCustomSelect
          label="Shipment Status"
          options={shipmentStatusOptions}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          value={filters.shipment_status}
          onChange={(e) => handleSelectChange(e, "shipment_status")}
          mode="multiple"
          maxTagCount={"responsive"}
        /> */}
        {currentTab === "all" && (
          <GlobalCustomSelect
            label="Shipment Status"
            options={handleLabel(shipmentStatusOptions)}
            placeholder="Select "
            popupClassName="rootOverlay-select-filter-multi"
            suffixIcon={<Arrow />}
            value={filters.shipment_status}
            mode="multiple"
            maxTagCount={"responsive"}
            tagRender={(e) => tagRender(e, shipmentStatusOptions)}
            onChange={(e) => handleSelectChange(e, "shipment_status")}
            dropdownRender={(menu) => {
              return handleDropdownRender(
                menu,
                filters.shipment_status,
                shipmentStatusOptions,
                "shipment_status"
              );
            }}
          />
        )}

        {/* <GlobalCustomSelect
          label="Remittance Status"
          options={remittanceStatusOptions}
          placeholder="Select "
          suffixIcon={<Arrow />}
          value={filters.remittance_status}
          onChange={(e) => handleSelectChange(e, "remittance_status")}
        /> */}
        <GlobalCustomSelect
          label="Payment Type"
          options={paymentTypeOptions}
          placeholder="Select "
          suffixIcon={<Arrow />}
          value={filters.payment_type}
          onChange={(e) => handleSelectChange(e, "payment_type")}
        />
        <GlobalCustomSelect
          label={"VF Product Name"}
          options={handleLabel(miscellaneousData.vfProductNameOptions,true)}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          value={filters.vf_product_name}
          mode="multiple"
          maxTagCount={"responsive"}
          tagRender={(e) =>
            tagRender(e, miscellaneousData.vfProductNameOptions)
          }
          onChange={(e) => handleSelectChange(e, "vf_product_name")}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.vf_product_name,
              miscellaneousData.vfProductNameOptions,
              "vf_product_name"
            );
          }}
        />
        <GlobalCustomSelect
          label={"Shopify Product Name"}
          options={handleLabel(miscellaneousData.shopifyProductNameOptions)}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          value={filters.shopify_product_name}
          mode="multiple"
          maxTagCount={"responsive"}
          tagRender={(e) =>
            tagRender(e, miscellaneousData.shopifyProductNameOptions)
          }
          onChange={(e) => handleSelectChange(e, "shopify_product_name")}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.shopify_product_name,
              miscellaneousData.shopifyProductNameOptions,
              "shopify_product_name"
            );
          }}
        />
      </div>

      <div className="footer-container">
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
