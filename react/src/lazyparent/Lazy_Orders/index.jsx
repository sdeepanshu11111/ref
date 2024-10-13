import React, { Suspense } from "react";
import { Skeleton } from "antd";

const Orders = React.lazy(() => import("../../components/Orders"));
function Lazy_Orders({ auth, selectedStoreIds, title }) {
  return (
    <div>
      <Suspense fallback={<Skeleton active style={{ padding: 20 }} />}>
        <Orders title={title} auth={auth} selectedStoreIds={selectedStoreIds} />
      </Suspense>
    </div>
  );
}
export default Lazy_Orders;
