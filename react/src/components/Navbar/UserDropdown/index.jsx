import React, { useMemo, useState, useEffect } from "react";
import { Dropdown, Flex, Space, Tag } from "antd";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { Actions } from "../../../store";
import { useSelector } from "react-redux";
import ArrowIcon from "../../../assets/Icons/Arrow";
import UserIcon from "../../../assets/Icons/UserIcon";
import {
  UserOutlined,
  AlertOutlined,
  DollarOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./index.scss";
import { useNavigate } from "react-router-dom";

import useWindowDimensions from "../../../CustomHooks/useWindowDimensions";

const UserDropdown = ({ showSmall = false }) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { signOut, loadingTrue } = bindActionCreators(Actions, dispatch);
  const auth = useSelector((state) => state.auth);
  const userFullName = auth?.auth?.user?.user_fname;
  const storeId = auth?.auth?.store?.id;

  const planName = auth?.auth?.plan?.current_plan?.plan_name;
  const getFormattedPlanName = (name) => {
    const firstWord = name?.split(" ")[0];
    return firstWord === "Earthquaker" ? "Earth Quaker" : firstWord;
  };

  const routeHandler = (url = "", storeid = true, store_geo = true) => {
    return window.location.assign(
      import.meta.env.VITE_REACT_OLD_APP_URL +
        `/switch-store/${auth?.auth?.store?.id}?redirect=` +
        auth?.auth?.store?.store_geo +
        `/` +
        auth?.auth?.store?.id +
        url
    );
    // }
  };

  // user dropdown
  const userDropdown = [
    {
      key: "profile",
      label: (
        <div
          className="profile-item profile"
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${storeId}?redirect=profile`
            )
          }
        >
          <UserOutlined />
          Profile
        </div>
      ),
    },
    {
      key: "plan",

      label: (
        <Flex
          justify="space-between"
          className="profile-item plan"
          gap={24}
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${storeId}?redirect=profile?plan`
            )
          }
        >
          <Flex gap={6} align="center" justify="start" className="plan">
            <AlertOutlined />
            Plan
          </Flex>

          <Tag>{getFormattedPlanName(planName)}</Tag>
        </Flex>
      ),
    },
    {
      key: "manage_funds",
      label: (
        <div
          className="profile-item"
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${storeId}?redirect=in/my-wallet`
            )
          }
        >
          <DollarOutlined />
          Manage Funds
        </div>
      ),
    },
    {
      key: "manage_users",
      label: (
        <div
          className="profile-item"
          // onClick={() => routeHandler("/manage-users")}
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${storeId}?redirect=${storeId}/manage-users`
            )
          }
        >
          <UserOutlined />
          Manage Users
        </div>
      ),
    },
    {
      key: "manage_stores",
      label: (
        <div
          className="profile-item"
          onClick={() =>
            window.location.assign(
              import.meta.env.VITE_REACT_OLD_APP_URL +
                `/switch-store/${storeId}?redirect=manage-stores`
            )
          }
        >
          <svg
            fill="#000000"
            stroke="#000000"
            strokeWidth=".3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="12px"
            height="12px"
          >
            <path d="M 22.740234 2.0371094 C 22.00642 2.0415914 21.280113 2.274142 20.619141 2.65625 C 19.737844 3.1657273 18.933962 3.9338237 18.183594 4.8984375 C 16.682858 6.8276652 15.396717 9.5598756 14.521484 12.753906 L 14.611328 12.779297 L 9.1367188 14.5625 A 1.0001 1.0001 0 0 0 8.4550781 15.384766 L 5.0078125 42.195312 A 1.0001 1.0001 0 0 0 5.8125 43.304688 L 30.396484 47.982422 A 1.0001546 1.0001546 0 0 0 30.617188 47.998047 A 1.0001 1.0001 0 0 0 30.876953 47.976562 L 44.216797 45.023438 A 1.0001 1.0001 0 0 0 44.990234 43.90625 C 44.990234 43.90625 43.822003 35.800556 42.650391 27.666016 C 42.064584 23.598746 41.476835 19.523332 41.035156 16.451172 C 40.814317 14.915092 40.630151 13.629215 40.5 12.720703 C 40.43492 12.266447 40.383175 11.907851 40.347656 11.658203 C 40.329896 11.533379 40.316061 11.434255 40.306641 11.367188 C 40.297241 11.300118 40.284432 11.18934 40.294922 11.287109 A 1.0001 1.0001 0 0 0 40.216797 10.994141 C 39.989378 10.472414 39.506277 10.164976 39.195312 10.058594 A 1.0001 1.0001 0 0 0 38.871094 10.003906 C 38.994089 10.003906 38.847584 10.002935 38.746094 9.9960938 C 38.644611 9.9892508 38.5046 9.9788613 38.339844 9.9667969 C 38.010331 9.942668 37.582714 9.9092847 37.160156 9.8769531 C 36.502652 9.8266448 36.113932 9.7972111 35.859375 9.7773438 C 35.680556 9.5942649 35.412809 9.318168 34.9375 8.8359375 C 34.63159 8.5255733 34.31706 8.2067806 34.058594 7.9492188 C 33.827912 7.7193444 33.69559 7.5877955 33.537109 7.4492188 C 33.321619 7.2328995 33.073339 7.0807821 32.761719 7.0253906 C 32.761102 7.025281 32.760383 7.0254995 32.759766 7.0253906 A 1.0001 1.0001 0 0 0 32.558594 6.9960938 A 1.0001 1.0001 0 0 0 32.304688 7.0195312 A 1.0001 1.0001 0 0 0 32.208984 7.0449219 A 1.0001 1.0001 0 0 0 32.193359 7.0488281 L 30.398438 7.6347656 C 30.128305 6.6043144 29.758213 5.6922753 29.242188 4.9492188 C 28.650215 4.096802 27.833103 3.441509 26.839844 3.2285156 C 26.365576 3.1269904 25.891418 3.1601017 25.435547 3.2753906 C 24.895846 2.6983551 24.243326 2.2760831 23.474609 2.1113281 C 23.230577 2.0591175 22.984839 2.0356154 22.740234 2.0371094 z M 22.740234 4.0332031 C 22.849067 4.0330423 22.952945 4.0447512 23.054688 4.0664062 C 23.228081 4.1035688 23.400372 4.1876691 23.570312 4.296875 C 23.14065 4.6611186 22.732859 5.0875036 22.341797 5.5761719 C 21.156537 7.0572633 20.105122 9.0652717 19.220703 11.277344 L 16.841797 12.052734 C 17.635609 9.6126113 18.670166 7.5301676 19.761719 6.1269531 C 20.398726 5.308067 21.048921 4.7174914 21.621094 4.3867188 C 22.049667 4.1389607 22.413735 4.0336857 22.740234 4.0332031 z M 26.644531 5.2578125 C 26.969613 5.3850208 27.284661 5.636331 27.599609 6.0898438 C 27.950526 6.5951486 28.263285 7.3412588 28.494141 8.2539062 L 27.466797 8.5898438 C 27.31294 7.3439635 27.043705 6.2239192 26.644531 5.2578125 z M 24.755859 5.921875 C 25.120341 6.7728286 25.395122 7.897511 25.529297 9.2207031 L 21.755859 10.451172 C 22.430013 9.0147554 23.167012 7.7450368 23.902344 6.8261719 C 24.193404 6.462465 24.479855 6.1691627 24.755859 5.921875 z M 31.4375 9.4003906 L 29.714844 45.816406 L 7.1113281 41.515625 L 10.357422 16.267578 L 31.4375 9.4003906 z M 33.404297 10.128906 C 33.442927 10.168046 33.475167 10.201166 33.513672 10.240234 C 34.120852 10.856256 34.693359 11.443359 34.693359 11.443359 A 1.0001 1.0001 0 0 0 35.332031 11.742188 C 35.332031 11.742188 36.160427 11.806258 37.007812 11.871094 C 37.431506 11.903514 37.859684 11.936508 38.193359 11.960938 C 38.264289 11.966138 38.309619 11.968236 38.371094 11.972656 C 38.406634 12.222323 38.456434 12.563453 38.519531 13.003906 C 38.649775 13.91307 38.835777 15.20008 39.056641 16.736328 C 39.498368 19.808824 40.084103 23.883817 40.669922 27.951172 C 41.775327 35.626033 42.755825 42.43319 42.876953 43.273438 L 31.720703 45.740234 L 33.404297 10.128906 z M 22.761719 17.003906 C 19.665673 17.005506 17.221874 18.085589 15.601562 19.771484 C 13.980073 21.458606 13.1875 23.705258 13.1875 25.960938 C 13.1875 28.69944 14.646706 30.324561 15.875 31.376953 C 16.489147 31.903149 17.040536 32.331485 17.380859 32.71875 C 17.721183 33.106015 17.863281 33.380835 17.863281 33.845703 C 17.863281 33.969384 17.799422 34.186171 17.695312 34.310547 C 17.591203 34.434923 17.491117 34.523438 17.146484 34.523438 C 16.576666 34.523438 15.672551 34.145494 14.970703 33.708984 C 14.268855 33.272475 13.78125 32.841797 13.78125 32.841797 A 1.0001 1.0001 0 0 0 12.160156 33.306641 L 11.041016 37.070312 A 1.0001 1.0001 0 0 0 11.214844 37.974609 C 11.214844 37.974609 13.666552 41.000852 18.265625 41.001953 C 20.251574 41.001953 22.053251 40.21074 23.3125 38.818359 C 24.571749 37.425978 25.283203 35.464448 25.283203 33.185547 C 25.283203 30.191401 23.565589 28.308967 22.052734 27.087891 C 21.296307 26.477352 20.581029 25.988648 20.125 25.582031 C 19.668971 25.175414 19.564453 24.951958 19.564453 24.818359 C 19.564453 24.717234 19.590423 24.441325 19.744141 24.238281 C 19.897859 24.035238 20.186603 23.757812 21.251953 23.757812 C 22.661815 23.757812 23.929688 24.423828 23.929688 24.423828 A 1.0001 1.0001 0 0 0 25.359375 23.853516 L 26.951172 18.945312 A 1.0001 1.0001 0 0 0 26.517578 17.78125 C 26.517578 17.78125 26.103925 17.540929 25.472656 17.351562 C 24.843229 17.16275 23.931476 16.99077 22.761719 17.003906 z M 22.779297 19 C 23.675995 18.9891 24.29797 19.122133 24.75 19.248047 L 23.791016 22.207031 C 23.136704 21.982727 22.248505 21.757813 21.251953 21.757812 C 19.756303 21.757812 18.699423 22.306043 18.150391 23.03125 C 17.601359 23.756457 17.564453 24.512484 17.564453 24.818359 C 17.564453 25.80376 18.176685 26.526664 18.792969 27.076172 C 19.409252 27.62568 20.123552 28.101069 20.796875 28.644531 C 22.143521 29.731455 23.283203 30.915692 23.283203 33.185547 C 23.283203 35.052646 22.715579 36.497443 21.830078 37.476562 C 20.944577 38.455683 19.736676 39.001953 18.265625 39.001953 C 15.009065 39.001173 13.540762 37.487382 13.138672 37.035156 L 13.675781 35.230469 C 13.800691 35.315329 13.774321 35.319339 13.914062 35.40625 C 14.766215 35.93624 15.876303 36.523438 17.146484 36.523438 C 18.019852 36.523438 18.779125 36.130624 19.228516 35.59375 C 19.677907 35.056876 19.863281 34.435022 19.863281 33.845703 C 19.863281 32.848071 19.419052 32.00864 18.882812 31.398438 C 18.346574 30.788234 17.730384 30.334554 17.175781 29.859375 C 16.066575 28.909017 15.1875 28.054435 15.1875 25.960938 C 15.1875 24.172617 15.812911 22.440081 17.044922 21.158203 C 18.276932 19.876325 20.12283 19.001953 22.767578 19.001953 A 1.0001 1.0001 0 0 0 22.779297 19 z" />
          </svg>
          Manage Stores
        </div>
      ),
    },

    {
      key: "logout",
      label: (
        <div className="profile-item" onClick={() => signOut()}>
          <PoweroffOutlined />
          Log out
        </div>
      ),
    },
  ];

  if (width < 768) {
    return (
      <div className="custom-small">
        <Dropdown
          overlayClassName="store-dropdown-overlay"
          menu={{
            items: !!userDropdown?.length ? userDropdown : [],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <UserIcon />
          </a>
        </Dropdown>
      </div>
    );
  }

  return (
    <div>
      <Dropdown
        overlayClassName="store-dropdown-overlay"
        menu={{
          items: !!userDropdown?.length ? userDropdown : [],
        }}
      >
        <a onClick={(e) => e.preventDefault()} className="user-dropdown-wraper">
          <div className="ic">
            <UserIcon />
          </div>

          <div className="user-dropdown">
            <div className="drop-down-head">{auth?.auth?.user?.user_role} </div>
            <Space>
              {userFullName}
              <div className="grn-arw">
                <ArrowIcon />
              </div>
            </Space>
          </div>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
