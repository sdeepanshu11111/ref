import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import axios from "axios";
import { data } from "autoprefixer";

axios.interceptors.response.use(
  function (response) {
    if (response?.data?.msg === "Unauthorized!") {
      return store.dispatch({
        type: "SIGNOUT_SUCCESS",
        payload: "Unauthorized",
      });
    }

    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch({
        type: "SIGNOUT_SUCCESS",
        payload: error,
      });
    }
    return Promise.reject(error);
  }
);

export const store = createStore(reducers, {}, applyMiddleware(thunk));
