import React from "react";
import { DatePicker } from "antd";
import "./index.scss";

import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const GlobalDatePicker = ({ dateRange, setDateRange, showText = true }) => {
  return (
    <div className="global-date-picker">
      {showText && <span className="date-filter-title">Showing Data For:</span>}

      <RangePicker
        value={[
          dateRange.start_date === "" || dateRange.start_date === null
            ? undefined
            : dayjs(dateRange.start_date, "YYYY-MM-DD"),
          dateRange.end_date === "" || dateRange.start_date === null
            ? undefined
            : dayjs(dateRange.end_date, "YYYY-MM-DD"),
        ]}
        onChange={(dateobj, startEndDate) => {
          setDateRange({
            start_date: startEndDate[0],
            end_date: startEndDate[1],
          });
        }}
        disabledDate={(current) => {
          return current > dayjs();
        }}
        ranges={{
          Today: [dayjs(), dayjs()],

          "Last 15 Days": [dayjs().subtract(15, "days"), dayjs()],
          "This Month": [dayjs().startOf("month"), dayjs()],
          "Last Month": [
            dayjs().subtract(1, "month").startOf("month"),
            dayjs().subtract(1, "month").endOf("month"),
          ],
          "Last Year": [
            dayjs().subtract(1, "year").startOf("year"),
            dayjs().subtract(1, "year").endOf("year"),
          ],
        }}
        separator={"~"}
      />
    </div>
  );
};
export default GlobalDatePicker;
