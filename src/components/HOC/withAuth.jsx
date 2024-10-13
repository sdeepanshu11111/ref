import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { auth } = props;
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth?.auth?.logged_in) {
        return navigate("/switch-store");
      } else {
        if (!auth?.auth?.user?.user_phone) {
          return navigate("/contact");
        }
        if (!auth?.auth?.user?.questionnaire) {
          return navigate("/signup-questionairre");
        }

        if (auth?.auth?.user?.subscription === "") {
          return navigate("/plans");
        }
      }
    }, [auth, navigate]);

    if (!auth?.auth?.logged_in) {
      return <Skeleton style={{ padding: "200px" }} active />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
