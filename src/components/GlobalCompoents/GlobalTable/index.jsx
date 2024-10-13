import React from "react";
import { Table } from "antd";
import "./index.scss";

const GlobalTable = ({
  loading = false,
  columns = [],
  dataSource = [],
  total = 0,
  setPagination,
  scrollX = null,
  scrollY = "70vh",
  title = null,
  pagination = {},
  showPagination = false,
  className = "",
  expandable={},
  rowClassName = () => "",
}) => {
  const handleChange = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page_no: page,
      limit: pageSize,
    }));
  };

  const isDefaultRowClassName = React.useMemo(
    () => rowClassName.toString() === (() => "").toString(),
    [rowClassName]
  );

  return (
    <div className={`global-table ${className}`}>
      <Table
        size="small"
        loading={loading}
        pagination={
          showPagination
            ? {
                total: pagination.count || total,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onChange: handleChange,
              }
            : false
        }
        expandable={expandable}
        title={title}
        columns={columns}
        bordered={isDefaultRowClassName}
        rowClassName={rowClassName}
        dataSource={dataSource}
        scroll={{
          x: scrollX,
          y: scrollY,
        }}
      />
    </div>
  );
};

export default GlobalTable;
