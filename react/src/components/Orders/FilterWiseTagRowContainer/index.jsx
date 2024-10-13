import { Tag, Tooltip } from "antd";
import React from "react";
import { useContext } from "react";
import { filterOptions } from "../constants";
import OrdersContext from "../OrdersContext";
import "./index.scss";
export const FilterWiseTagRowContainer = ({ filters, setFilters, filter }) => {
  const { setModal } = useContext(OrdersContext);

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
  if (filter?.multiSelect && filters[filter.key]?.length) {
    let first = filter.items.find((o) => o.value == filters[filter.key][0]);

    return (
      <div className="order-filter-tag-row-container">
        <Tooltip title={filter?.label}>
          <Tag
            className="active-filter-tag"
            color={"#F1F0FF"}
            onClick={handleAllFilterOpen}
          >
            {" "}
            <span className="label-container">{first.label}</span>
            {filters[filter.key]?.length > 1 && (
              <span className="filter-count-container">
                +{filters[filter.key].length - 1} more
              </span>
            )}
          </Tag>
        </Tooltip>
      </div>
    );
  }
  if (!filter?.multiSelect && filters[filter.key]) {
    let obj = filter.items.find((obj) => {
      return obj.value === filters[filter.key];
    });

    return (
      <div className="order-filter-tag-row-container">
        <Tooltip title={filter?.label}>
          <Tag
            className="active-filter-tag"
            color={"#F1F0FF"}
            onClick={handleAllFilterOpen}
          >
            <span className="label-container">{obj.label}</span>
          </Tag>
        </Tooltip>
      </div>
    );
  }
};
