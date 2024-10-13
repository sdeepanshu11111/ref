import React, { Suspense } from "react";
import { Skeleton } from "antd";

const Home = React.lazy(() => import("../../components/Home"));
function Lazy_Home({ auth, selectedStoreIds }) {
  return (
    <div>
      <Suspense fallback={<Skeleton active style={{ padding: 20 }} />}>
        <Home auth={auth} selectedStoreIds={selectedStoreIds} />
      </Suspense>
    </div>
  );
}
export default Lazy_Home;
