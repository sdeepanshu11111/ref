import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { saveFilters } from "../../../Apis/saveFilters";
import { savePreferencesApi } from "../../../Apis/savePreferances";
import { DeleteBoxIcon } from "../../../Icons";
import OrdersContext from "../../../OrdersContext";

export const DeleteSection = ({ filter }) => {
  const { fetchSavedFilter, savedFilters, fetchPreferences } =
    useContext(OrdersContext);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      let data = {};
      data.delete = filter.id;
      setLoading(true);
      const res = await savePreferencesApi(data);

      fetchPreferences();
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
            <DeleteBoxIcon />
          </span>
        }
        size="large"
        className="left-btn"
      />
    </div>
  );
};
