import React from "react";
import GlobalCustomInput from "../../../../GlobalCompoents/GlobalCustomInput";
import { AlertYellow } from "../../../../Orders/Icons";
import "./index.scss";
export const RefundSection = ({ refundInfo, setRefundInfo,shipmentTotalAmount }) => {
  const onInputChange = (e, key) => {
    setRefundInfo((pre) => {
      return {
        ...pre,
        [key]: e.target.value,
      };
    });
  };
  return (
    <div className="refundInfoSection">
      {" "}
      <div className="divider-container">
        <div className="item-1"> Refund End Customer</div>
        <div className="item-2"></div>
      </div>
      <div className="info-bar-container">
        <div>
          <AlertYellow />
        </div>
        <div>
          <span>Important:</span> Please note, customer account information
          should be correct, this refund will be credited after being validated
          by our finance team.
        </div>
      </div>
      <div>
        <div className="input-container">
          <GlobalCustomInput
            addonBefore={"Customer Name"}
            placeholder="Enter customer name"
            value={refundInfo.customer_name}
            onChange={(e)=>onInputChange(e,"customer_name")}
          />
        </div>
        <div className="input-container">
          <GlobalCustomInput
            addonBefore={"Account Number"}
            placeholder="Enter account number"
            value={refundInfo.acc_no}
            type={"number"}
            onChange={(e)=>onInputChange(e,"acc_no")}
          />
        </div>
        <div className="input-container">
          <GlobalCustomInput
            addonBefore={"Confirm Account Number"}
            placeholder="Re-enter account number"
            value={refundInfo.confirm_acc_no}
            type={"number"}
            onChange={(e)=>onInputChange(e,"confirm_acc_no")}
          />
        </div>
        <div className="input-container">
          <GlobalCustomInput
            addonBefore={"IFSC Code"}
            placeholder="Enter IFSC"
            value={refundInfo.ifsc_code}
            onChange={(e)=>onInputChange(e,"ifsc_code")}
          />
        </div>
        <div className="input-container">
          <div className="amount-row-container">
            <div>
              <GlobalCustomInput
                addonBefore={"Total Order Amount"}
                disabled={true}
                value={shipmentTotalAmount}
              />
            </div>
            <div>
              <GlobalCustomInput
                value={refundInfo.amount}
                addonBefore={"Refund Amount"}
                type={"number"}
                onChange={(e)=>onInputChange(e,"amount")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
