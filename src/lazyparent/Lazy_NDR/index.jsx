import React, { Suspense } from "react";
import { Skeleton } from "antd";

const NDRPage = React.lazy(() => import("../../components/NDRPage"));
function Lazy_NDR({ auth, selectedStoreIds, title }) {
  return (
    <div>
      <Suspense fallback={<Skeleton active style={{ padding: 20 }} />}>
        <NDRPage title={title} auth={auth} selectedStoreIds={selectedStoreIds} />
      </Suspense>
    </div>
  );
}
export default Lazy_NDR;
