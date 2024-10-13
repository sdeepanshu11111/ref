import React from "react";
import { Progress } from "antd";
import { CompletedIcon, KycIcon, LinkIcon, ProductIcon } from "../Icons";
import { Card } from "./Card";
import { ConnectBottomBar } from "./ConnectBottomBar";
import { ConnectCompletedBottombar } from "./ConnectCompletedBottomBar";
import "./index.scss";
import { KycBottomBar } from "./KycBottomBar";
import { ProductBottomBar } from "./ProductBottomBar";
import { HalfCircle } from "../Icons";
import { ProductCompleteBottombar } from "./ProductCompletedBottomBar";
import { useSelector } from "react-redux";
export const StepsCardSectionContainer = () => {
  const auth = useSelector((state) => state.auth.auth);
  let activeStore = false;
  let sellproduct = auth.steps.PRODUCT_CHOOSE;
  let kycComplete = auth.steps.KYC;

  let stores = Object.keys(auth?.user?.user_stores);

  stores.forEach((id) => {
    if (auth?.user?.user_stores[id].store_connected) {
      activeStore = true;
    }
  });
  return (
    <div className="stepsCardsSectionContainer">
      <div className="heading-section">Get started in few easy steps</div>

      <div className="cards-container">
        <div className="cardContainer">
          <Card
            headingIcon={activeStore ? <CompletedIcon /> : <LinkIcon />}
            heading="Connect your store"
            info="Link your Shopify or Woocommerce store with vFulfill, or create a new store."
            type="link"
            bottomBar={
              activeStore ? <ConnectCompletedBottombar /> : <ConnectBottomBar />
            }
            mode={activeStore ? "completed" : "pending"}
          />
        </div>
        <div className="cardContainer">
          <Card
            headingIcon={sellproduct ? <CompletedIcon /> : <ProductIcon />}
            heading="Find a Winning Product"
            info="Explore hand-picked products in catalog
            or discover product ideas from research tool."
            type="product"
            bottomBar={
              sellproduct ? <ProductCompleteBottombar /> : <ProductBottomBar />
            }
            mode={sellproduct ? "completed" : "pending"}
          />
        </div>
        <div className="cardContainer">
          <Card
            headingIcon={kycComplete ? <CompletedIcon /> : <KycIcon />}
            heading="Complete your profile"
            info="Submit KYC, add your banking details and set up your operational preferences."
            type="kyc"
            bottomBar={!kycComplete && <KycBottomBar />}
            mode={kycComplete ? "completed" : "pending"}
          />
        </div>
      </div>
    </div>
  );
};
