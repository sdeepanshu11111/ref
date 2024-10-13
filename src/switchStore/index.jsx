import React from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "antd";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { Actions } from "../store";
import qs from "qs";

import { useNavigate, useParams } from "react-router-dom";

const SwitchStore = (props) => {
  const dispatch = useDispatch();
  const { switchStore, signOut, loadingTrue } = bindActionCreators(
    Actions,
    dispatch
  );
  const match = useMatch("/:storegeo/:storeid");

  let navigate = useNavigate();
  const params = useParams();
  const auth = useSelector((state) => state.auth);

  const store = auth?.auth?.store;
  const storeId = auth?.auth?.store?.id;
  const storeGeo = auth?.auth?.store?.store_geo;
  const storeRole = auth?.auth?.store?.store_role;
  const storePermissions = auth?.auth?.store?.store_permissions;
  const loggedIn = auth?.auth?.logged_in;

  const setCookie = (cname, cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + 100000); // (exdays*24*60*60*1000)
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  // mount
  useEffect(() => {
    switchStore();
  }, []);

  // update
  useEffect(() => {
    if (!loggedIn) {
      setCookie(
        "url_redirect",
        `${JSON.stringify(window.location.search.replace(/\?/, ""))}`
      );
      return navigate("/login");
    } else {
      const params2 = qs.parse(window.location.search.replace(/\?/, ""));
      if (!store) {
        signOut("You do not have any active stores!");
        return;
      }

      if (params2.redirect) {
        return navigate(`/${params2.redirect}`);
      }
      //Check if url_redirect exists in Session Storage
      else if (
        getCookie("url_redirect") !== null &&
        getCookie("url_redirect") !== undefined
      ) {
        return navigate(`/dashboard`);
      }
    }
  });

  return (
    <div style={{ height: "100px" }}>
      <Skeleton active style={{ padding: "32px" }} />
    </div>
  );
};
export default SwitchStore;
