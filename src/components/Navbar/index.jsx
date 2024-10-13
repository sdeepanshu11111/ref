import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../store";
import { Layout, Dropdown, Space, message, Tooltip } from "antd";
import UserIcon from "../../assets/Icons/UserIcon";
import ArrowIcon from "../../assets/Icons/Arrow";
import BellIcon from "../../assets/Icons/Bell";
import CollapseIc from "../../assets/Icons/CollapseIc";
import UnCollapseIc from "../../assets/Icons/UnCollapseIc";
// import BellIcon from "../../assets/Icons/Bell";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from Framer Motion
import StoreDropdown from "./StoreDropdown";
import UserDropdown from "./UserDropdown";
import WalletAmount from "./WalletAmount";
import PlanDetails from "../GlobalCompoents/PlanDetailsButton";
import ShopifyDropdown from "./ShopifyDropdown/index";
import { DownloadOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../CustomHooks/useWindowDimensions";
const { Header } = Layout;
import "./index.scss";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { signOut, loadingTrue } = bindActionCreators(Actions, dispatch);
  const { width } = useWindowDimensions();
  const storeName = props?.auth?.auth?.store?.store_name;
  const storeId = props?.auth?.auth?.store?.id;
  const storeGeo = props?.auth?.auth?.store?.store_geo;
  const userFirstName = props?.auth?.auth?.user?.user_firstname.split(" ")[0];
  const userFullName = props?.auth?.auth?.user?.user_fname;
  // const userFullName = props?.auth?.auth?.user?.user_fullname + "'s Store";

  return (
    <>
      <Header className="navbar">
        <div className="left">

          <button
            className="hamb"
            onClick={() => props.setCollapsed(!props.collapsed)}
          >
            {!props.collapsed && <CollapseIc />}
            {props.collapsed && <UnCollapseIc />}
          </button>
          <h2>Referral</h2>

          {/* <StoreDropdown props={props} /> */}
        </div>
        <div className="right">
          {/* <PlanDetails /> */}
          {/* <WalletAmount showSmall={width < 768 ? true : false} props={props} /> */}
          {/* <ShopifyDropdown /> */}
          {/* <Tooltip title="Download Reports">
            <DownloadOutlined
              onClick={() =>
                window.location.assign(
                  import.meta.env.VITE_REACT_OLD_APP_URL +
                    `/switch-store/${storeId}?redirect=downloads`
                )
              }
              style={{
                fontSize: "24px",
                color: "#505050",
                cursor: "pointer",
              }}
            />
          </Tooltip> */}

          <div
            style={{
              fontSize: "1px",
              color: "#505050",
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() =>
              window.location.assign(
                import.meta.env.VITE_REACT_OLD_APP_URL +
                  `/switch-store/${storeId}?redirect=${storeGeo}/${storeId}/all-notification`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 20 24"
            >
              <path
                id="notifications_FILL0_wght300_GRAD0_opsz24"
                d="M180-839.51v-1.876h2.41v-9.331a6.657,6.657,0,0,1,1.66-4.461,7.441,7.441,0,0,1,4.263-2.479v-.779a1.462,1.462,0,0,1,.486-1.107A1.66,1.66,0,0,1,190-860a1.666,1.666,0,0,1,1.181.456,1.46,1.46,0,0,1,.487,1.107v.779a7.441,7.441,0,0,1,4.263,2.479,6.657,6.657,0,0,1,1.66,4.461v9.331H200v1.876ZM190-848.672ZM190-836a2.4,2.4,0,0,1-1.7-.664,2.113,2.113,0,0,1-.706-1.6h4.82a2.109,2.109,0,0,1-.709,1.6A2.407,2.407,0,0,1,190-836Zm-5.588-5.387h11.18v-9.331a4.9,4.9,0,0,0-1.637-3.707A5.571,5.571,0,0,0,190-855.959a5.571,5.571,0,0,0-3.953,1.536,4.9,4.9,0,0,0-1.637,3.707Z"
                transform="translate(-180.001 859.999)"
                fill="#505050"
              />
            </svg>
          </div>
          <UserDropdown
            signOut={signOut}
            props={props}
            showSmall={width < 768 ? true : false}
            userFullName={userFullName}
            userFirstName={userFullName}
          />
        </div>
      </Header>
    </>
  );
};
export default Navbar;
