import axios from "axios";
import analytics from "../../analytics";
import { message } from "antd";

export const signIn = (credentials) => {
  const { email, password } = credentials;
  return (dispatch, getState) => {
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/login/email",
      method: "post",
      data: {
        email,
        password,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          analytics.identify(res.data.data.store.id, {
            storeName: res.data.data.store.store_name,
            email: res.data.data.user.user_email,
            from: window.innerWidth < 800 ? "Mobile" : "Desktop",
          });

          // if (window.innerWidth < 1280) {
          //   if (res.data.data.user.subscription !== "") {
          //     return window.location.assign(
          //       import.meta.env.VITE_REACT_OLD_APP_URL_MOBILE
          //     );
          //   } else {
          //     return window.location.assign(
          //       import.meta.env.VITE_REACT_OLD_APP_URL
          //     );
          //   }
          // } else {
          //   return window.location.assign(
          //     import.meta.env.VITE_REACT_OLD_APP_URL
          //   );
          // }

          // return window.location.assign(import.meta.env.VITE_REACT_OLD_APP_URL);
          dispatch({ type: "LOGIN_SUCCESS", payload: { data: res.data.data } });
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

export const switchStore = (storeid) => {
  return (dispatch, getState) => {
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/store/switch_store",
      method: "post",
      data: {
        storeid,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success === 1) {
          dispatch({
            type: "STORE_SWITCH_SUCCESSFUL",
            payload: { data: res.data.data },
          });
        } else {
          dispatch({ type: "SIGNOUT_SUCCESS" });
        }
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

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
