import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Drawer, Button, Flex } from "antd";
import { VfFullLogo, VfHalfLogo } from "./icons";
import CollapseIc from "../../assets/Icons/CollapseIc";
import UnCollapseIc from "../../assets/Icons/UnCollapseIc";
import DashboardContext from "../../dashboard/DashboardContext";
import useWindowDimensions from "../../CustomHooks/useWindowDimensions";
import { items } from "./items";
import "./index.scss";

const { Sider } = Layout;

const Sidebar = (props) => {
  const { navigate } = props;
  const [sideBarActivekey, setSideBarActivekey] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = useWindowDimensions();
  const { initialSelectedStores } = useContext(DashboardContext);

  const routeHandler = (url = "") => {
    let auth = props?.auth;

    if (width < 1280) {
      return window.location.assign(
        import.meta.env.VITE_REACT_OLD_APP_URL_MOBILE +
          `/switch-store/${initialSelectedStores[0]}?redirect=` +
          auth?.auth?.store?.store_geo +
          `/` +
          initialSelectedStores[0] +
          url
      );
    } else {
      return window.location.assign(
        import.meta.env.VITE_REACT_OLD_APP_URL +
          `/switch-store/${initialSelectedStores[0]}?redirect=` +
          auth?.auth?.store?.store_geo +
          `/` +
          initialSelectedStores[0] +
          url
      );
    }
  };
  const routeNavigate = (url = "") => {
    navigate(url);
  };

  const route = {
    snapshot: () => routeHandler("/"),
    dashboard: () => routeNavigate("/dashboard"),
    my_products: () => routeHandler("/products/import-list"),
    quotations: () => routeHandler("/products/rfq"),
    product_research: "./product-research",
    pricing_requests: () => routeHandler("/requests/pricing-requests"),
    // program: () => routeNavigate("/program"),
    // orders: () => routeHandler("/orders/open"),
    // order_in_processing: () => routeHandler("/orders/processing"),
    // order_closed: () => routeHandler("/orders/closedOrders"),
    // order_all: () => routeHandler("/orders"),
    // order_open: () => routeNavigate("/orders?currentPage=open"),
    // order_in_processing: () =>
    //   routeNavigate("/orders?currentPage=in_processing"),
    // order_closed: () => routeNavigate("/orders?currentPage=closed"),
    // order_all: () => routeNavigate("/orders?currentPage=all"),
    ordersSummary: () => routeNavigate("/orders?currentPage=ordersSummary"),
    program: () => routeNavigate("/program"),
    payouts: () => routeNavigate("/payout"),
    affiliate: () => routeNavigate("/affiliate"),
    shippingSettings: () => routeHandler("/shippingSettings"),
    ndr: () => routeHandler("/ndr"),
    inventory: () => routeHandler("/live-inventory"),
    request: () => routeHandler("/requests/sourcing-requests"),
    escalation: () => routeHandler("/escalation/escalations"),
    ndr_escalation: () => routeHandler("/escalation/ndr-escalations"),
    post_delivery: () => routeHandler("/requests/shipment-requests"),
    reporting: () => routeHandler("/reports"),
    services: () => routeHandler("/contact-center"),
    settings: () => routeHandler("/settings"),
  };

  // useEffect(() => {
  //   if (!!route[props?.match?.params?.module]) {
  //     setSideBarActivekey(props?.match?.params?.module);
  //   } else if (!!props?.match?.params?.module) {
  //     setSideBarActivekey(props?.match?.params?.module);
  //   } else {
  //     setSideBarActivekey("");
  //   }
  // }, []);

  useEffect(() => {
    if (sideBarActivekey !== null) {
      if (sideBarActivekey === "") {
        navigate(`/dashboard`);
      } else if (typeof route[sideBarActivekey] === "function") {
        route[sideBarActivekey](); // Call the function
      } else {
        navigate(`/${route[sideBarActivekey]}`);
      }
    }
  }, [sideBarActivekey]);

  const renderMenu = () => (
    <Menu
      onClick={({ key }) => setSideBarActivekey(key)}
      theme="dark"
      selectedKeys={[sideBarActivekey]}
      mode="inline"
      items={items}
    />
  );

  const handleDrawerToggle = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <>
      {width > 768 ? (
        <Sider
          trigger={null}
          collapsed={props?.collapsed}
          collapsedWidth={80}
          width={250}
          className="sidebar"
          // onMouseEnter={() => setCollapsed(false)}
          // onMouseLeave={() => setCollapsed(true)}
        >
          <div className="sidebar-store-wraper">
            <div>
              <div onClick={() => navigate(`/dashboard`)} className="logo">
                <Flex gap={4} className={`icon ${props.collapsed}`}>
                  {/* <VfHalfLogo />

                  <span>
                    <VfFullLogo />
                  </span> */}Logo
                </Flex>
              </div>
              {renderMenu()}
            </div>
          </div>
        </Sider>
      ) : (
        <div className="mobile-sidebar">
          <Button
            className="ham"
            type="ghost"
            icon={!drawerVisible ? <UnCollapseIc /> : <CollapseIc />}
            onClick={handleDrawerToggle}
            style={{ position: "fixed", top: 16, left: 10, zIndex: 99999999 }}
          />

          <Drawer
            title="Menu"
            className="mobile-sidebar"
            placement="left"
            closable={true}
            onClose={handleDrawerToggle}
            open={drawerVisible}
            key="left"
          >
            {renderMenu()}
          </Drawer>
        </div>
      )}
    </>
  );
};

export default Sidebar;
