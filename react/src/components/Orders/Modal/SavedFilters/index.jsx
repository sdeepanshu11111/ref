import { Button } from "antd";
import React, { useContext, useState } from "react";
import {
  CrossEyeIcon,
  DeleteBoxIcon,
  EditFilterIcon,
  GreenEyeIcon,
  SaveChangeIcon,
} from "../../Icons";
import { HeaderSection } from "../HeaderSection";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
import { EyeSection } from "./EyeSection";
import { DeleteSection } from "./DeleteSection.jsx";
import { defaultFilters } from "../../constants";
export const SavedFilters = ({ onClose }) => {
  const { setModal, savedFilters } = useContext(OrdersContext);

  const handleEditFilter = (filterData) => {
    let data = { ...filterData };
    data.edit = filterData.id;

    setModal({
      open: true,
      currentModal: "filterModal",
      data: data,
    });
  };
  const handleAllFilterOpen = () => {
    setModal({
      open: true,
      currentModal: "filterModal",
      data: {
        filters: defaultFilters,
        name: "",
        id: "",
        edit: "",
      },
    });
  };

  return (
    <div className="save-order-filter-modal-container">
      <HeaderSection
        headingText="Saved Filters"
        headerIcon={<SaveChangeIcon />}
        onClose={onClose}
      />
      <div className="main-container">
        <div className="sectionHeading">Saved Filters:</div>
        <div className="setting-container">
          {savedFilters.map((filter, index) => {
            return (
              <div key={index} className="filter-setting-bar-container">
                {" "}
                <div className="filter-name-container left">{filter.name}</div>
                <div className="item-right">
                  {filter.default ? (
                    <div>
                      {" "}
                      <Button
                        type="text"
                        icon={
                          <span className="icon-container">
                            {<GreenEyeIcon />}
                          </span>
                        }
                        size="large"
                        className="left-btn"
                      />
                    </div>
                  ) : (
                    <EyeSection filter={filter} />
                  )}
                  {filter.default ? null : (
                    <div>
                      {" "}
                      <Button
                        type="text"
                        icon={
                          <span className="icon-container">
                            <EditFilterIcon />
                          </span>
                        }
                        size="large"
                        className="left-btn"
                        onClick={() => handleEditFilter(filter)}
                      />
                    </div>
                  )}
                  {filter.default ? null : <DeleteSection filter={filter} />}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="footer-container">
            <Button
              type="primary"
              className="save-btn"
              onClick={handleAllFilterOpen}
            >
              {" "}
              + Create New Saved Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
