import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ExtenalLink } from "../../Icons";
import "./index.scss";
export const KycBottomBar = () => {
  const auth = useSelector((state) => state.auth);

  const storeId = auth?.auth?.store?.id;
  const handleClick = () => {
    window.open(
      import.meta.env.VITE_REACT_OLD_APP_URL +
        `/switch-store/${storeId}?redirect=${auth?.auth?.store?.store_geo}/${storeId}/onboarding`
    );
  };
  return (
    <div className="card-kyc-bottom">
      <div className="first-row">
        <Button type="primary" className="submit-btn" onClick={handleClick}>
          Submit KYC
          <span className="icon-container">
            <ExtenalLink />
          </span>
        </Button>
      </div>
      <div className="sec-row">
        <Button className="pr-tool" onClick={handleClick}>
          Or, Add your banking details
        </Button>
      </div>
      {/* <div className="third-row">
        <Button className="pr-tool" onClick={handleClick}>
          Or, Set up your operational preferences
        </Button>
      </div> */}
    </div>
  );
};
