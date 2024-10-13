// auth (Store) intial state
const initState = {
  loading: false,
  authError: null,
  auth: {
    logged_in: localStorage.getItem("logged_in")
      ? localStorage.getItem("logged_in")
      : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    store: localStorage.getItem("store")
      ? JSON.parse(localStorage.getItem("store"))
      : null,
    steps: localStorage.getItem("steps")
      ? JSON.parse(localStorage.getItem("steps"))
      : null,
    plan: localStorage.getItem("plan")
      ? JSON.parse(localStorage.getItem("plan"))
      : null,
  },
  count: {},
};

// auth actions
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        authError: action?.err?.msg ? action.err.msg : action.err,
      };

    case "LOGIN_SUCCESS":
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("store", JSON.stringify(action.payload.data.store));
      localStorage.setItem("steps", JSON.stringify(action.payload.data?.steps));
      localStorage.setItem("plan", JSON.stringify(action.payload.data.plan));

      return {
        ...state,
        loading: false,
        auth: {
          logged_in: true,
          user: action.payload.data.user,
          store: action.payload.data.store,
          steps: action.payload.data?.steps,
          plan: action.payload.data.plan,
        },
        authError: null,
      };

    case "STORE_SWITCH_SUCCESSFUL":
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("store", JSON.stringify(action.payload.data.store));
      localStorage.setItem("steps", JSON.stringify(action.payload.data?.steps));
      localStorage.setItem("plan", JSON.stringify(action.payload.data.plan));

      return {
        ...state,
        loading: false,
        auth: {
          logged_in: true,
          user: action.payload.data.user,
          store: action.payload.data.store,
          steps: action.payload.data?.steps,
          plan: action.payload.data.plan,
        },
        authError: null,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "REMOVEERROR":
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_ERROR":
      return {
        ...state,
        loading: false,
        signupError: action.err,
      };

    case "SIGNUP_SUCCESS":
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("store", JSON.stringify(action.payload.data.store));
      localStorage.setItem("steps", JSON.stringify(action.payload.data?.steps));
      localStorage.setItem("plan", JSON.stringify(action.payload.data.plan));

      return {
        ...state,
        loading: false,
        auth: {
          logged_in: true,
          user: action.payload.data.user,
          store: action.payload.data.store,
          steps: action.payload.data?.steps,
          plan: action.payload.data.plan,
        },
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      localStorage.clear();
      return {
        ...state,
        loading: false,
        auth: {
          logged_in: false,
          domid: "",
        },
        authError: action?.payload?.message ? action.payload.message : null,
      };

    case "STORE_STATUS_UPDATED":
      const user = JSON.parse(localStorage.getItem("user"));
      user.user_stores[action.payload.storeid]["store_active"] =
        action.payload.status;
      return {
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...state.auth.user,
            user_stores: {
              ...state.auth.user.user_stores,
              [action.payload.storeid]: {
                ...state.auth.user.user_stores[action.payload.storeid],
                store_active: action.payload.status,
              },
            },
          },
        },
      };

    case "STORE_COUNT_SUCCESSFUL":
      return {
        ...state,
        count: action.payload.data,
      };

    default:
      return state;
  }
};

export default authReducer;
