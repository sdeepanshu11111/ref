import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { saveFilters } from "../../../Apis/saveFilters";
import { CrossEyeIcon, GreenEyeIcon } from "../../../Icons";
import OrdersContext from "../../../NDRContext";

export const EyeSection = ({ filter }) => {
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
      data.visible = filter.id;
      setLoading(true);
      const res = await saveFilters(data);

      fetchSavedFilter();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (filter.visible) {
    return (
      <div>
        {" "}
        <Button
          type="text"
          loading={loading}
          icon={<span className="icon-container">{<GreenEyeIcon />}</span>}
          size="large"
          className="left-btn"
          onClick={handleClick}
        />
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Button
          type="text"
          loading={loading}
          icon={<span className="icon-container">{<CrossEyeIcon />}</span>}
          size="large"
          className="left-btn"
          onClick={handleClick}
        />
      </div>
    );
  }
};
