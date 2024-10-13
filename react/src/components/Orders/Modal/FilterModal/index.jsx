import { Button, Checkbox, message, Tag } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../../../assets/Icons/Arrow";
import { FilterIcon } from "../../../../assets/Icons/FilterIcon";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import { saveFilters } from "../../Apis/saveFilters";
import {
  ExternalLink,
  LockFilterIcon,
  PremiumIcon,
  SaveChangeIcon,
} from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import {
  addressReasons,
  cancelOrderreasonsOptions,
  duplicateOrdersOptions,
  orderStatusOptions,
  paymentTypeOptions,
  rtoRiskOption,
  serviceabilityOptions,
} from "./constants";
import "./index.scss";

export const FilterModal = ({ onClose }) => {
  const {
    modal,
    filters: mainFilter,
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
  const navigate = useNavigate();
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
        labelFilter: obj.label,
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
  const showCancelReasonFilter = () => {
    if (currentPage == "all" && currentTab == "all") {
      return true;
    }

    if (
      currentPage == "closed" &&
      (currentTab == "cancelled" || currentTab == "all")
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="orderpageFilterContainer">
      <HeaderSection
        onClose={onClose}
        headingText="All Filters"
        headerIcon={<FilterIcon />}
      />
      <div className="filters-main-container">
        <GlobalCustomSelect
          label="Order Serviceability"
          options={serviceabilityOptions}
          placeholder="Select "
          suffixIcon={<Arrow />}
          value={filters?.serviceability}
          onChange={(e) => handleSelectChange(e, "serviceability")}
        />
        <GlobalCustomSelect
          label="Order Tags"
          options={handleLabel(miscellaneousData.tagOptions)}
          placeholder="Select "
          suffixIcon={<Arrow />}
          mode="multiple"
          value={filters.order_tags}
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, miscellaneousData.tagOptions)}
          onChange={(e) => handleSelectChange(e, "order_tags")}
          popupClassName="rootOverlay-select-filter-multi"
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.order_tags,
              miscellaneousData.tagOptions,
              "order_tags"
            );
          }}
        />
        {/* <GlobalCustomSelect
          label="Order Tags"
          options={handleLabel(miscellaneousData.tagOptions)}
          placeholder="Select "
          suffixIcon={<Arrow />}
          // open={true}
          mode="multiple"
          value={filters.tags}
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, miscellaneousData.tagOptions)}
          onChange={(e) => handleSelectChange(e, "tags")}
          popupClassName="rootOverlay-select-filter-multi"
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.tags,
              miscellaneousData.tagOptions,
              "tags"
            );
          }}
        />
        <GlobalCustomSelect
          label="Order Tags"
          options={handleLabel(miscellaneousData.tagOptions)}
          placeholder="Select "
          suffixIcon={<Arrow />}
          // open={true}
          mode="multiple"
          value={filters.tags}
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, miscellaneousData.tagOptions)}
          onChange={(e) => handleSelectChange(e, "tags")}
          popupClassName="rootOverlay-select-filter-multi"
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.tags,
              miscellaneousData.tagOptions,
              "tags"
            );
          }}
        /> */}
        <GlobalCustomSelect
          label="Order Duplication"
          options={duplicateOrdersOptions}
          placeholder="Select "
          suffixIcon={<Arrow />}
          value={filters.order_duplication}
          onChange={(e) => handleSelectChange(e, "order_duplication")}
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
          showSearch
          optionFilterProp="labelFilter"
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
          showSearch
          optionFilterProp="labelFilter"
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
        {currentPage == "all" && currentTab == "all" && (
          <GlobalCustomSelect
            label={"Order Status"}
            options={handleLabel(orderStatusOptions)}
            placeholder="Select "
            popupClassName="rootOverlay-select-filter-multi"
            suffixIcon={<Arrow />}
            value={filters.vforder_status}
            mode="multiple"
            maxTagCount={"responsive"}
            tagRender={(e) => tagRender(e, orderStatusOptions)}
            onChange={(e) => handleSelectChange(e, "vforder_status")}
            dropdownRender={(menu) => {
              return handleDropdownRender(
                menu,
                filters.vforder_status,
                orderStatusOptions,
                "vforder_status"
              );
            }}
          />
        )}
        {showCancelReasonFilter() && (
          <GlobalCustomSelect
            placeholder="Select "
            popupClassName="rootOverlay-select-filter-multi"
            mode="multiple"
            maxTagCount={"responsive"}
            tagRender={(e) => tagRender(e, cancelOrderreasonsOptions)}
            dropdownRender={(menu) => {
              return handleDropdownRender(
                menu,
                filters.cancel_reason,
                cancelOrderreasonsOptions,
                "cancel_reason"
              );
            }}
            label="Cancellation Reason"
            options={handleLabel(cancelOrderreasonsOptions)}
            suffixIcon={<Arrow />}
            value={filters?.cancel_reason}
            onChange={(e) => handleSelectChange(e, "cancel_reason")}
          />
        )}

        {!miscellaneousData.showMavFilters ? (
          <div className="divider-container">
            <div className="item-1">
              {" "}
              <span>
                <LockFilterIcon />
              </span>{" "}
              Locked Filters
            </div>
            <div className="item-2"></div>
          </div>
        ) : (
          <div className="divider-container divider-container-premium">
            <div className="item-1">
              {" "}
              <span className="icon-container">
                <PremiumIcon />
              </span>{" "}
              Premium Filters
            </div>
            <div className="item-2"></div>
          </div>
        )}
        <GlobalCustomSelect
          label={
            !miscellaneousData.showMavFilters ? (
              <span className="locked-title">RTO Risk Indicator</span>
            ) : (
              "RTO Risk Indicator"
            )
          }
          options={handleLabel(rtoRiskOption)}
          placeholder="Select "
          popupClassName="rootOverlay-select-filter-multi"
          suffixIcon={<Arrow />}
          disabled={!miscellaneousData.showMavFilters}
          value={filters.rto_risk_indicator}
          mode="multiple"
          maxTagCount={"responsive"}
          tagRender={(e) => tagRender(e, rtoRiskOption)}
          onChange={(e) => handleSelectChange(e, "rto_risk_indicator")}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.rto_risk_indicator,
              rtoRiskOption,
              "rto_risk_indicator"
            );
          }}
        />
        <GlobalCustomSelect
          label={
            !miscellaneousData.showMavFilters ? (
              <span className="locked-title">Address Quality Metrics</span>
            ) : (
              "Address Quality Metrics"
            )
          }
          popupClassName="rootOverlay-select-filter-multi"
          options={handleLabel(addressReasons)}
          placeholder="Select "
          disabled={!miscellaneousData.showMavFilters}
          suffixIcon={<Arrow />}
          value={filters.address_quality_metrics}
          mode="multiple"
          maxTagCount={"responsive"}
          onChange={(e) => handleSelectChange(e, "address_quality_metrics")}
          tagRender={(e) => tagRender(e, addressReasons)}
          dropdownRender={(menu) => {
            return handleDropdownRender(
              menu,
              filters.address_quality_metrics,
              addressReasons,
              "address_quality_metrics"
            );
          }}
        />
      </div>
      {!miscellaneousData.showMavFilters && (
        <div className="upgrate-link-container">
          <Button
            type="text"
            onClick={() => {
              navigate("/plans");
            }}
          >
            {" "}
            Upgrade Your Plan To Unlock{"   "}
            <span className="icon-container">
              <ExternalLink />
            </span>
          </Button>
        </div>
      )}
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
