import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";

const LoadingComp = ({ auth, navigate }) => {
  const loading = auth?.loading;

  useEffect(() => {
    if (!loading) {
      return navigate(
        `/${auth?.auth?.store?.store_geo}/${auth?.auth?.store?.id}`
      );
    }
  }, [loading]);

  return (
    <div style={{ height: "100px" }}>
      <Skeleton active style={{ padding: "32px" }} />
    </div>
  );
};

export default LoadingComp;
