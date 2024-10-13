import React, { useState, useEffect, useRef } from "react";
import { Layout, Skeleton, Result, Button, message } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { OnBoadingModal } from "../OnBoadingModal";
import { IntercomComponent } from "../components/IntercomComponent";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import getAnswer from "../newLogin/API/getAnswer";
import "./index.scss";
import withAuth from "../components/HOC/withAuth";
import AddFundsModal from "../components/AddFundsModal";
import DashboardContext from "./DashboardContext";
const { Content } = Layout;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, errorMsg: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle={this.state.errorMsg}
        />
      );
    }

    return this.props.children;
  }
}

function Dashboard(props) {
  const { component: Component, auth } = props;
  const [initialSelectedStores, setInitialSelectedStores] = useState([
    auth?.auth?.store?.id,
  ]);
  const [onboardingModal, setOnboardingModal] = useState({
    open: false,
    screen: "1",
  });
  const [collapsed, setCollapsed] = useState(true);
  const errorBoundaryRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (errorBoundaryRef.current) {
      errorBoundaryRef.current.resetErrorBoundary();
    }
  }, [location]);

  useEffect(() => {
    document.title = props?.title;
  }, [props.title]);

  return (
    <DashboardContext.Provider
      value={{ initialSelectedStores, setInitialSelectedStores }}
    >
      <Layout id="fade-in" className="dashboard">
        <Sidebar
          error={props.error}
          match={props.match}
          params={params}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          auth={auth}
          location={location}
          navigate={navigate}
        />
        <Layout className="site-layout">
          <Navbar
            match={props.match}
            params={params}
            auth={auth}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            location={location}
            navigate={navigate}
            initialSelectedStores={initialSelectedStores}
            setInitialSelectedStores={setInitialSelectedStores}
          />
          <Content className="content">
            <ErrorBoundary ref={errorBoundaryRef}>
              {Component && (
                <Component
                  selectedStoreIds={initialSelectedStores}
                  auth={auth}
                />
              )}
            </ErrorBoundary>
          </Content>
        </Layout>
        {onboardingModal?.open && (
          <OnBoadingModal
            navigate={navigate}
            auth={auth}
            defaultScreen={onboardingModal?.screen}
            closeModal={() => setOnboardingModal(false)}
            open={onboardingModal?.open}
          />
        )}

        <IntercomComponent />
      </Layout>
    </DashboardContext.Provider>
  );
}

export default withAuth(Dashboard);
