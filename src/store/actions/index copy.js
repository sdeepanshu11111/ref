import axios from "axios";
import analytics from "../../analytics";
import { message } from "antd";

const loginData = {
  user: {
    user_role: "Owner",
    user_fname: "Tarang Bhargava",
    user_firstname: "Tarang Bhargava",
    user_email: "anagement@lpanache.coo",
    user_created: "1601293882",
    user_stores: {
      "5f6c356ecbaa645d158b4595": {
        id: "5f6c356ecbaa645d158b4595",
        store_name: "Notion Watch",
        store_hash: "d51aa833fe0c8890ef79012061f1926d",
        store_role: "owner",
        store_active: 1,
        store_connected: 1,
        store_permissions: [],
        store_shopifyadmin: "smartwatchindia.myshopify.com",
        store_geo: "in",
        store_platform: "shopify",
        store_url: "notionwatch.com",
      },
      "5fbf791fcbaa6402648b458a": {
        id: "5fbf791fcbaa6402648b458a",
        store_name: "wristmateinn",
        store_hash: "da0fcbb69f7a0b59fa0382cd35bd5cae",
        store_role: "owner",
        store_active: 1,
        store_connected: 0,
        store_permissions: [],
        store_shopifyadmin: "wristmatein.myshopify.com",
        store_geo: "in",
        store_platform: "shopify",
        store_url: "www.wristmate.in",
      },
      "604f244dcbaa6490298b4567": {
        id: "604f244dcbaa6490298b4567",
        store_name: "Sunveno India",
        store_hash: "be737f768ff2b5b2b5487a6c3ff99f57",
        store_role: "owner",
        store_active: 1,
        store_connected: 1,
        store_permissions: [],
        store_shopifyadmin: "sunvenoin.myshopify.com",
        store_geo: "in",
        store_platform: "shopify",
        store_url: "www.sunveno.in",
      },
      "604f246bcbaa6490298b4568": {
        id: "604f246bcbaa6490298b4568",
        store_name: "Mark Ryden India",
        store_hash: "3e9642d374afbe21ddf903317cd94f84",
        store_role: "owner",
        store_active: 1,
        store_connected: 1,
        store_permissions: [],
        store_shopifyadmin: "lpanacheagain.myshopify.com",
        store_geo: "in",
        store_platform: "shopify",
        store_url: "www.markryden.in",
      },
      "623d9a3d8ac2665bec6c4724": {
        id: "623d9a3d8ac2665bec6c4724",
        store_name: "newbuyidustore",
        store_hash: "09933f8e1dd86fd98095cf9a7bc000bd",
        store_role: "owner",
        store_active: 1,
        store_connected: 1,
        store_permissions: [],
        store_shopifyadmin: "newbuyidustore.myshopify.com",
        store_geo: "in",
        store_platform: "shopify",
        store_url: "newbuyidustore.myshopify.com",
      },
    },
    user_manager: {
      email: "support@vfulfill.io",
      name: "",
    },
    email_verified: 1,
    show_onboarding: false,
    user_kyc_origin: "india",
    user_phone: {
      code: "+91",
      number: "9999999999",
    },
    questionnaire: true,
    numid: "VFUS1283",
    user_origin: "SIGNUP_INSIDER",
    user_type: "MAIL",
    view_product_drops: false,
    subscription: "active",
    account_status: true,
    due_from: 0,
    expire_date: "2024-10-20 16:36:06",
  },
  store: {
    id: "5f6c356ecbaa645d158b4595",
    store_name: "Notion Watch",
    store_hash: "d51aa833fe0c8890ef79012061f1926d",
    store_role: "owner",
    store_active: 1,
    store_connected: 1,
    store_permissions: [],
    store_shopifyadmin: "smartwatchindia.myshopify.com",
    store_geo: "in",
    store_platform: "shopify",
    store_url: "notionwatch.com",
  },
  steps: {
    ADD_FUNDS: true,
    KYC: true,
    BANK: true,
    PLAN: true,
    PRODUCT_CHOOSE: true,
  },
  plan: {
    plan_name: "",
    plan_features: null,
    current_plan: {
      plan_name: null,
      public: null,
      start_date: "2024-07-26 04:36:19",
      renewal_date: "2024-08-26 04:36:19",
      currency: "",
      amount: null,
      amount_inr: 0,
      interval: null,
      interval_count: null,
      plan_status: "active",
      plan_vf_status: "active",
      plan_type: "",
      cancellation_scheduled: 0,
      collection_pause: 0,
    },
    show_trial: 1,
  },
};

export const signIn = (credentials) => {
  const { email, password } = credentials;
  return (dispatch, getState) => {
    axios({
      // url: import.meta.env.VITE_REACT_API_URL + "/login/email",
      url: "https://2f29-2405-201-802c-f800-8f72-c190-ca7f-b811.ngrok-free.app/auth/login",
      method: "post",
      data: {
        email,
        password,
      },
      withCredentials: false,
    })
      .then((res) => {
        console.log("loginres", res, res.data);

        let data = { ...loginData, ...res.data };

        if (res.status === 201) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { data: loginData },
          });
        } else {
          dispatch({ type: "LOGIN_ERROR", err: res.data.msg });
        }
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signUp = (credentials) => {
  const { first_name, last_name, email, password } = credentials;
  return (dispatch, getState) => {
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/mail_signup",
      method: "post",
      data: {
        first_name,
        last_name,
        email,
        password,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: "SIGNUP_SUCCESS",
            payload: { data: res.data.data },
          });
        } else {
          dispatch({ type: "SIGNUP_ERROR", err: res.data.msg });
        }
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const signOut = (msg) => {
  return (dispatch) => {
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/logout",
      method: "post",
      withCredentials: true,
    }).then((res) => {
      if (res.data.success === 1) {
        dispatch({ type: "SIGNOUT_SUCCESS", payload: { msg } });
      }
    });
  };
};

export const updateStoreStatus = (store) => {
  return (dispatch) =>
    dispatch({
      type: "STORE_STATUS_UPDATED",
      payload: {
        storeid: store._id["$oid"],
        status: store.store_active,
      },
    });
};

// export const switchStore = (storeid) => {
//   return (dispatch, getState) => {
//     axios({
//       url: import.meta.env.VITE_REACT_API_URL + "/store/switch_store",
//       method: "post",
//       data: {
//         storeid,
//       },
//       withCredentials: true,
//     })
//       .then((res) => {
//         if (res.data.success === 1) {
//           dispatch({
//             type: "STORE_SWITCH_SUCCESSFUL",
//             payload: { data: res.data.data },
//           });
//         } else {
//           dispatch({ type: "SIGNOUT_SUCCESS" });
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: "SIGNOUT_SUCCESS" });
//       });
//   };
// };

export const loadingTrue = (storeid) => {
  return (dispatch, getState) => {
    dispatch({ type: "LOADING" });
  };
};

export const removeError = (storeid) => {
  return (dispatch, getState) => {
    dispatch({ type: "REMOVEERROR" });
  };
};

export const storecount = (storeid) => {
  return (dispatch, getState) => {
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/store/get_store_counts",
      method: "post",
      data: {
        storeid: storeid,
      },
      withCredentials: true,
    }).then((res) => {
      if (res) {
        dispatch({
          type: "STORE_COUNT_SUCCESSFUL",
          payload: { data: res.data },
        });
      }
    });
  };
};
