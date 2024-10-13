import React, { useState } from "react";
import { Modal, Button, Tabs } from "antd";
import "./index.scss";
import ClickToCopy from "../../ClickToCopy";
const { TabPane } = Tabs;

const AccountDetails = ({ details }) => {
  const copyAll = () => {
    let textToCopy = "";
    Object.keys(details).forEach((key) => {
      textToCopy += details[key] + "\n";
    });
    const tempElement = document.createElement("textarea");
    tempElement.value = textToCopy.trim();
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  };

  return (
    <div className="account-details">
      <p>
        Account Name:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.ac_name}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        Account Number:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.ac_num}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        Bank Name:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.bank_name}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        Bank Address:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.Bank_Address}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        SWIFT Code:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.SWIFT_Code}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        ABA Routing Number:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.ABA_Routing_Number}
          ></ClickToCopy>
        </span>
      </p>
      <p>
        Bank Account Currency:
        <span>
          <ClickToCopy
            fullText={true}
            textToCopy={details.Bank_Account_Currency}
          ></ClickToCopy>
        </span>
      </p>
      <p className="copy-all" onClick={copyAll}>
        <ClickToCopy textToCopy={"Copy All"}></ClickToCopy>{" "}
      </p>
    </div>
  );
};

const WireTransferSuccessOutSideIndiaModal = (props) => {
  const [bank, setBank] = useState("icici");
  const details = {
    icici: {
      ac_name: "vFulfill Inc.",
      ac_num: "202256687939",
      bank_name: "Choice Financial Group",
      Bank_Address: "4501 23rd Avenue S Fargo, ND 58104, USA",
      SWIFT_Code: "CHFGUS44021",
      ABA_Routing_Number: "091311229",
      Bank_Account_Currency: "USD",
    },
  };

  return (
    <Modal
      className="wireSuccessModal1"
      open={props.open}
      width={480}
      title={null}
      closable={props.hideFooter}
      onCancel={props.toggleSuccessModal}
      footer={null}
    >
      <div style={{ textAlign: "center" }}>
        <div className="transaction-sucess-content">
          {/* <Icon component={wireSuccessIcon} /> */}
          <h1>Please follow the process carefully.</h1>
          <p>Transfer funds to the account with following details:</p>
        </div>
        <Tabs activeKey={bank} onChange={(key) => setBank(key)}>
          <TabPane tab="Choice Financial Group" key="icici">
            <AccountDetails details={details[bank]} />
          </TabPane>
        </Tabs>
        <div className="copy-message">
          <p>
            Please add the message <span>"vFulfill Funds for {props.id}" </span>
            in the remarks while transferring the amount
          </p>
          <ClickToCopy textToCopy={`vFulfill Funds for ${props.id}`}>
            {(copy) => <Button onClick={copy}>Copy the message</Button>}
          </ClickToCopy>
        </div>
        <div className="footer-button">
          {!props.hideFooter && (
            <Button onClick={() => window.location.reload()} type="link">
              Continue To Dashboard
              {/* <Icon component={rightArrow} /> */}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WireTransferSuccessOutSideIndiaModal;
