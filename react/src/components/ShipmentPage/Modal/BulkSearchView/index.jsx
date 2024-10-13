import { Button, Input } from "antd";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { BulkActionIcon } from "../../../../assets/Icons/BulkActionIcon";
import { BulkSearchIcon } from "../../../../assets/Icons/BulkSearchIcon";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { CloseIcon, InfoBulbIcon, RedCrossIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import "./index.scss";
export const BulkSearchViewModal = ({ onClose }) => {
  const { setFilters, filters, setModal } = useContext(OrdersContext);
  const [bulkSearch, setBulkSearch] = useState(filters.bulkSearch);
  const [input, setInput] = useState("");
  const [currentSearch, setCurrentSearch] = useState([]);
  const handleApply = () => {
    const bulkSearchArr = [...currentSearch, ...bulkSearch];
    setFilters((pre) => {
      return {
        ...pre,
        bulkSearch: bulkSearchArr,
      };
    });
    onClose();
  };
  const handlesSearchClose = (index) => {
    setBulkSearch((pre) => {
      let arr = [...pre];
      arr.splice(index, 1);
      return arr;
    });
  };
  const handleClearBulk = () => {
    setBulkSearch(() => {
      return [];
    });
    setCurrentSearch([]);
    setModal({
      open: true,
      currentModal: "bulkSearchModal",
      data: {},
    });
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddSearch = () => {
    let add = input.split(/,|\n/);
    setCurrentSearch([...currentSearch, ...add.filter((t) => t !== "")]);
    setInput("");
  };
  const handleCurrentSearchClose = (index) => {
    let newArr = currentSearch.filter((t, ind) => ind !== index);
    setCurrentSearch([...newArr]);
  };
  return (
    <div className="bulk-seach-view-order-modal">
      <HeaderSection
        headingText="Bulk Search"
        headerIcon={<BulkSearchIcon />}
        onClose={onClose}
      />
      <div className="bulkSearch-main-container">
        {currentSearch.length === 0 && bulkSearch.length === 0 ? null : (
          <>
            {" "}
            <div className="tag-container">
              {currentSearch.map((search, index) => {
                return (
                  <div key={index} className="tag current-tag">
                    {search}
                    <span onClick={() => handleCurrentSearchClose(index)}>
                      <CloseIcon />
                    </span>
                  </div>
                );
              })}
              {bulkSearch.map((search, index) => {
                return (
                  <div className="tag" key={index}>
                    {" "}
                    {search}{" "}
                    <span onClick={() => handlesSearchClose(index)}>
                      <CloseIcon />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="clear-btn-container">
              <Button
                type="text"
                className="clear-btn"
                onClick={handleClearBulk}
              >
                <RedCrossIcon /> Clear Bulk Search{" "}
              </Button>
            </div>
          </>
        )}

        <div className="note-text-area-container">
          {" "}
          <GlobalCustomTextArea
            placeholder={
              "Enter multiple Shopify Order ID, VF Order ID, AWB separated by a comma or a new line"
            }
            value={input}
            onChange={handleChange}
          />
        </div>
        <div className="footer-container">
          <Button
            type="primary"
            className="submit-btn save-btn"
            disabled={!input}
            onClick={handleAddSearch}
          >
            {" "}
            Add New Shipment Search(s)
          </Button>
          <Button
            className="submit-btn"
            style={{ width: "100%" }}
            type="primary"
            onClick={handleApply}
          >
            <span className="icon-container">
              <BulkSearchIcon />
            </span>{" "}
            Apply Bulk Search
          </Button>
        </div>
        <div className="info-box-container">
          <div>You can bulk search shipments via</div>
          <div>
            1. <span className="id">vFulfill Order ID </span>or,
          </div>
          <div>
            2. <span className="id">Shopify Order ID </span>or,
          </div>
          <div>
            3. <span className="id">AWB </span>
          </div>
          <div className="icon-container">
            <InfoBulbIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
