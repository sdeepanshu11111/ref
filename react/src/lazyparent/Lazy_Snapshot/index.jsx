import React, { Suspense } from "react";
import { Skeleton } from "antd";

const Snapshot = React.lazy(() => import("../../components/Snapshot.jsx"));
function Lazy_Snapshot({ auth, selectedStoreIds }) {
  return (
    <div>
      <Suspense fallback={<Skeleton active style={{ padding: 20 }} />}>
        <Snapshot auth={auth} selectedStoreIds={selectedStoreIds} />
      </Suspense>
    </div>
  );
}
export default Lazy_Snapshot;
