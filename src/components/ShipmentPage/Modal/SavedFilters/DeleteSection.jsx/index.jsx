import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { saveFilters } from "../../../Apis/saveFilters";
import {  DeleteBoxIcon, } from "../../../Icons";
import OrdersContext from "../../../OrdersContext";

export const DeleteSection = ({ filter }) => {
  const {
    modal,
    filters,
    setFilters,
    setModal,
    miscellaneousData,
    currentPage,
    currentTab,
    fetchSavedFilter,
    savedFilters,
  } = useContext(OrdersContext);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      let data = {};
      data.delete = filter.id;
      setLoading(true);
      const res = await saveFilters(data);

      fetchSavedFilter();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      <Button
        type="text"
        onClick={handleClick}
        loading={loading}
        icon={
          <span className="icon-container">
            <DeleteBoxIcon 
             />
          </span>
        }
        size="large"
        className="left-btn"
      />
    </div>
  );
};
