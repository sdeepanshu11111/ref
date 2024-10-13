import React, { useMemo, useState, useEffect } from "react";
import { Dropdown, Flex, Space, Tag } from "antd";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { Actions } from "../../../store";
import { useSelector } from "react-redux";
import ArrowIcon from "../../../assets/Icons/Arrow";
import { ShopifyStoreIcon } from "../../../assets/Icons/ShopifyStoreIcon";
import OpenNewTab from "../../../assets/Icons/OpenNewTab";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { icons } from "antd/es/image/PreviewGroup";

const UserDropdown = ({ showSmall = false }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { signOut, loadingTrue } = bindActionCreators(Actions, dispatch);
  const auth = useSelector((state) => state.auth);

  const { store, user } = auth?.auth;
  let activeStores = Object.values(user?.user_stores).filter(
    (store) => store.store_active === 1
  );
  let obj = {};
 
  activeStores.map((o) => {
    obj[o.id] = user?.user_stores[o.id];
  });
 
  const storesArray = Object.entries(obj).map((s, i) => {
    const storeAdminUrl = s[1]?.store_shopifyadmin?.startsWith("https://")
      ? s[1]?.store_shopifyadmin
      : "https://" + s[1]?.store_shopifyadmin;

    const storeUrl = s[1]?.store_url?.startsWith("https://")
      ? s[1]?.store_url
      : "https://" + s[1]?.store_url;

    return {
      key: i,
      label: s[1]?.store_name,

      children: [
        {
          key: "item1",
          label: (
            <a className="nested-item" href={storeAdminUrl} target="_blank">
              Open Store Admin
              <OpenNewTab />
            </a>
          ),
        },
        {
          key: "item2",

          label: (
            <a className="nested-item" href={storeUrl} target="_blank">
              Go To Store
              <OpenNewTab />
            </a>
          ),
        },
      ],
    };
  });

  return (
    <>
      <div className="shopify-dropdown-wraper">
        <div className="user-dropdown">
          <Dropdown
            overlayClassName="shopify-dropdown-overlay"
            menu={{
              items: !!storesArray?.length ? storesArray : [],
            }}
          >
            <a
              className="ant-dropdown-link flex"
              href="#/"
              style={{ color: "black" }}
            >
              <div className="ic">
                <ShopifyStoreIcon />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14.827"
                height="8.828"
                viewBox="0 0 14.827 8.828"
              >
                <path
                  id="Path_2311"
                  data-name="Path 2311"
                  d="M6,0,0,6.4,6,12"
                  transform="translate(1.413 7.413) rotate(-90)"
                  fill="none"
                  stroke="#212121"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </svg>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
