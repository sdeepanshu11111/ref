import { Button, Input } from "antd";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { BulkActionIcon } from "../../../../assets/Icons/BulkActionIcon";
import { BulkSearchIcon } from "../../../../assets/Icons/BulkSearchIcon";
import { InfoBulbIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import "./index.scss";
export const BulkSearchModal = ({ onClose }) => {
  const { setFilters } = useContext(OrdersContext);

  const [bulkSearch, setBulkSearch] = useState("");
  const handleApply = () => {
    const bulkSearchArr = [...bulkSearch.split(/,|\n/)].filter((search) => search);

    setFilters((pre) => {
      return {
        ...pre,
        bulkSearch: bulkSearchArr,
      };
    });
    onClose();
  };
  return (
    <div className="bulk-seach-order-modal">
      <HeaderSection
        headingText="Bulk Search"
        headerIcon={<BulkSearchIcon />}
        onClose={onClose}
      />
      <div className="bulkSearch-main-container">
        <Input.TextArea
          placeholder= "Enter multiple Shopify Order ID, VF Order ID, AWB separated by a comma or a new line"
          value={bulkSearch}
          onChange={(e) => {
            setBulkSearch(e.target.value);
          }}
        ></Input.TextArea>
        <div className="footer-container">
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
