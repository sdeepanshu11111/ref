import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { saveFilters } from "../../../Apis/saveFilters";
import { savePreferencesApi } from "../../../Apis/savePreferances";

import { CrossEyeIcon, GreenEyeIcon } from "../../../Icons";
import OrdersContext from "../../../NDRContext";

export const EyeSection = ({ filter }) => {
  const { fetchSavedFilter, fetchPreferences } = useContext(OrdersContext);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      let data = {};
      data.visible = filter.id;
      setLoading(true);
      const res = await savePreferencesApi(data);

      fetchPreferences();
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
