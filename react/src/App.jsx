import React, { Suspense } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch,
} from "react-router-dom";

import { useSelector } from "react-redux";

import { Skeleton } from "antd";
// components

// const SwitchStore = React.lazy(() => import("./switchStore"));

// const Plans = React.lazy(() => import("./Plans"));
// const Subscription = React.lazy(() => import("./Subscription"));
import Subscription from "./Subscription";
import SwitchStore from "./switchStore";
// import Login2 from "./newLogin";
import Login2 from "./newLogin";
import Plans from "./Plans";

import SignupQuestionairre from "./components/Signup/SignupQuestionairre";
// lazy component
import Affiliates from "./affiliates.jsx"
import Payout from "./payout.jsx";
import Lazy_Home from "./lazyparent/Lazy_Home";

import Lazy_Shipment from "./lazyparent/Lazy_Shipment";

import ScreenWapper from "./components/ScreenWapper";
import ContactDetailsFrom from "./newLogin/ContactDetailsFrom";



const Dashboard = React.lazy(() => import("./dashboard"));
const InvalidPath = React.lazy(() => import("./invalidPath"));

function App() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/:module");

  const hash = useMatch("/reset/:hash");

  return (
    <div className="app-layout-blank flex flex-auto flex-col min-h-[100vh]">
      <Suspense
        fallback={
          <div style={{ height: "100vh" }}>
            <Skeleton active style={{ padding: "32px" }} />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Login2
                match={match}
                auth={auth}
                location={location}
                hash={hash}
                navigate={navigate}
                activeTab="login"
                title="vFulfill | Login"
              />
            }
          />
          <Route path="/test" element={<ScreenWapper />} />

          <Route
            path="/contact"
            element={<ContactDetailsFrom title="vFulfill | Contact Details" />}
          />

          <Route
            path="/login"
            element={
              <Login2
                match={match}
                auth={auth}
                location={location}
                title="vFulfill | Login"
                hash={hash}
                navigate={navigate}
                activeTab="login"
              />
            }
          />
          <Route
            path="/reset/:id"
            element={
              <Login2
                match={match}
                auth={auth}
                location={location}
                title="vFulfill | Reset Password"
                hash={hash}
                navigate={navigate}
                activeTab="reset-password"
              />
            }
          />


          <Route
            path="/signup"
            element={
              <Login2
                auth={auth}
                location={location}
                title="vFulfill | Signup"
                hash={hash}
                navigate={navigate}
                activeTab="signup"
              />
            }
          />
          <Route
            path="/signup-questionairre"
            element={
              <SignupQuestionairre
                auth={auth}
                location={location}
                hash={hash}
                title="vFulfill | Questionnaire"
                navigate={navigate}
                activeTab="question"
              />
            }
          />

          <Route
            path="/plans"
            element={
              <Plans
                auth={auth}
                title="vFulfill | Plans"
                location={location}
                hash={hash}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/subscription"
            element={
              <Subscription
                auth={auth}
                title="vFulfill | Subscription"
                location={location}
                hash={hash}
                navigate={navigate}
              />
            }
          />

          <Route
            path="/forgot"
            element={
              <Login2
                auth={auth}
                title="vFulfill | Forgot Password"
                location={location}
                hash={hash}
                navigate={navigate}
                activeTab="forgot"
              />
            }
          />


   
          <Route
            path="/dashboard"
            element={
              <Dashboard
                auth={auth}
                title="Reffral | Home"
                location={location}
                match={match}
                navigate={navigate}
                component={Lazy_Home}
              />
            }
          />
          {/* <Route
            path="/program"
            exact="true"
            element={
              <Dashboard
                title="vFulfill | Orders"
                auth={auth}
                location={location}
                match={match}
                navigate={navigate}
                component={Lazy_Orders}
              />
            }
          /> */}
    
          <Route
            path="/program"
            element={
              <Dashboard
                title="Reffral | Programs"
                auth={auth}
                location={location}
                match={match}
                navigate={navigate}
                component={Lazy_Shipment}
              />
            }
          />
          <Route
            path="/affiliate"
            element={
              <Dashboard
                title=" Reffral | affiliates"
                auth={auth}
                location={location}
                match={match}
                navigate={navigate}
                component={Affiliates}
              />
            }
          />
                    <Route
            path="/payouts"
            element={
              <Dashboard
                title=" Reffral | payouts"
                auth={auth}
                location={location}
                match={match}
                navigate={navigate}
                component={Payout}
              />
            }
          />

          <Route
            path="/switch-store"
            element={
              <SwitchStore
                auth={auth}
                location={location}
                match={match}
                navigate={navigate}
              />
            }
          />

          <Route path="*" element={<InvalidPath navigate={navigate} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
