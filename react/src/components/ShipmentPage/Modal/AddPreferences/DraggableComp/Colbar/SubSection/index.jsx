import React from "react";
import { SectionToogleContainer } from "./SectionToogle";
import "./index.scss";
import { DemoOrderDetails } from "./DemoOrderDetails";
import { DemoCustomerInfo } from "./DemoCustomerInfo";
import { DemoProductDetailCol } from "./DemoProductdetails";
export const SubSection = ({ data, index, setPreferenceModal }) => {
  return (
    <div className="sub-section-preferences-container">
      {" "}
      {data.subTabArray.map((v, i) => (
        <SectionToogleContainer
          tabdata={v}
          tabIndex={i}
          data={data}
          index={index}
          setPreferenceModal={setPreferenceModal}
        />
      ))}
      {data.headingPreference === "Shipment Details" && (
        <div className="demo-bar-container">
          <div className="headingf">Shipment Details (Demo)</div>
          <DemoOrderDetails data={data} />
        </div>
      )}
      {data.headingPreference === "Customer Info" && (
        <div className="demo-CustomerInfo-bar-container">
          <div className="headingf">Customer Info (Demo)</div>
          <DemoCustomerInfo data={data} />
        </div>
      )}
      {data.headingPreference === "Product Details" && (
        <div className="demo-CustomerInfo-bar-container">
          <div className="headingf">
            <span>Product Details (Demo)</span>{" "}
            {data.subTabArray[3]?.visible ? <span>Quantity</span> : ""}
          </div>
          <DemoProductDetailCol data={data} />
        </div>
      )}
    </div>
  );
};
