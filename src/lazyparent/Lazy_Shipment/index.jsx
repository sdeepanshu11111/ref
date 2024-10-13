import React, { Suspense } from "react";
import { Skeleton } from "antd";

const ShipmentPage = React.lazy(() => import("../../components/ShipmentPage"));
function Lazy_Snapshot({ auth, selectedStoreIds }) {
  return (
    <div>
      <Suspense fallback={<Skeleton active style={{ padding: 20 }} />}>
        <ShipmentPage auth={auth} selectedStoreIds={selectedStoreIds} />
      </Suspense>
    </div>
  );
}
export default Lazy_Snapshot;
