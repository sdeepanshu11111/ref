import { Button, Tag } from "antd";
import React, { useContext } from "react";
import { SearchIcon } from "../../../../assets/Icons/SearchIcon";
import { CloseIcon, EyeIcon, RedCrossIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
export const BulkSearchBar = () => {
  const { filters, setFilters, setModal } = useContext(OrdersContext);
  const { bulkSearch = [] } = filters;
  const handleTagClose = (index) => {
    setFilters((pre) => {
      let arr = [...pre.bulkSearch];
      arr.splice(index, 1);
      return {
        ...pre,
        bulkSearch: arr,
      };
    });
  };
  const handleClearBulk = () => {
    setFilters((pre) => {
      return {
        ...pre,
        bulkSearch: [],
      };
    });
  };
  const handleNewBulkOrder = () => {
    setFilters((pre) => {
      return {
        ...pre,
        bulkSearch: [],
      };
    });
    setModal({
      open: true,
      currentModal: "bulkSearchModal",
      data: {},
    });
  };
  const handleOpenBulkView = () => {
    setModal({
      open: true,
      currentModal: "bulkSearchViewModal",
      data: {},
    });
  };
  return (
    <div className=" order-bulk-search-bar-container">
      <div className="bulk-search-container">
        <div className="tag-container">
          {bulkSearch
            .filter((s, i) => i < 2)
            .map((search, index) => {
              return (
                <div className="tag" key={index}>
                  {" "}
                  {search}{" "}
                  <span onClick={() => handleTagClose(index)}>
                    <CloseIcon />
                  </span>
                </div>
              );
            })}
          {bulkSearch.length > 2 ? (
            <div className="plus-order-container" onClick={handleOpenBulkView}>
              +{bulkSearch.length - 2} Orders{" "}
              <span className="icon-container">
                {" "}
                <EyeIcon />
              </span>
            </div>
          ) : null}
        </div>
        <Button type="text" className="clear-btn" onClick={handleClearBulk}>
          <RedCrossIcon /> Clear Bulk Search{" "}
        </Button>
      </div>
      <div className="newBulk-search-container">
        <Button
          className="submit-btn"
          style={{ width: "100%" }}
          type="primary"
          onClick={handleNewBulkOrder}
        >
          <span className="icon-container">
            <SearchIcon />
          </span>{" "}
          New Bulk Search
        </Button>
      </div>
    </div>
  );
};
