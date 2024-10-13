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
          <ClickToCopy fullText={true} textToCopy={details.ac_name} />
        </span>
      </p>
      <p>
        Account Number:
        <span>
          <ClickToCopy fullText={true} textToCopy={details.ac_num} />
        </span>
      </p>
      <p>
        Bank Name:
        <span>
          <ClickToCopy fullText={true} textToCopy={details.bank_name} />
        </span>
      </p>
      <p>
        IFSC Code:
        <span>
          <ClickToCopy fullText={true} textToCopy={details.bank_ifsc} />
        </span>
      </p>
      <p>
        Branch Name:
        <span>
          <ClickToCopy fullText={true} textToCopy={details.bank_branch} />
        </span>
      </p>

      <p className="copy-all" onClick={copyAll}>
        <span>
          <ClickToCopy textToCopy={"Copy All"} />
        </span>
      </p>
    </div>
  );
};

const WireTransferSuccessModal = ({
  open,
  toggleSuccessModal,
  hideFooter,
  id,
}) => {
  const [bank, setBank] = useState("icici");

  const details = {
    hdfc: {
      ac_name: "VCFL EXPRESS PRIVATE LIMITED",
      ac_num: "50200043366411",
      bank_name: "HDFC BANK",
      bank_ifsc: "HDFC0004817",
      bank_branch: "SCO-37, SECTOR - 18, GURGAON",
    },
    icici: {
      ac_name: "VCFL EXPRESS PVT. LTD.",
      ac_num: "114505001669",
      bank_name: "ICICI BANK",
      bank_ifsc: "ICIC0001145",
      bank_branch: "UDYOG VIHAR GURGAON BRANCH",
    },
  };

  return (
    <Modal
      className="wireSuccessModal"
      open={open}
      width={480}
      title={null}
      closable={hideFooter}
      onCancel={toggleSuccessModal}
      footer={null}
    >
      <div style={{ textAlign: "center" }}>
        <div className="transaction-sucess-content">
          <h1>Please follow the process carefully.</h1>
          <p>Transfer funds to the account with following details:</p>
        </div>
        <Tabs activeKey={bank} onChange={(key) => setBank(key)}>
          <TabPane tab="ICICI Bank" key="icici">
            <AccountDetails details={details["icici"]} />
          </TabPane>
          <TabPane tab="HDFC Bank" key="hdfc">
            <AccountDetails details={details["hdfc"]} />
          </TabPane>
        </Tabs>
        <div className="copy-message">
          <p>
            Please add the message <span>"vFulfill Funds for {id}" </span>
            in the remarks while transferring the amount
          </p>
          <ClickToCopy textToCopy={`vFulfill Funds for ${id}`}>
            {(copy) => <Button onClick={copy}>Copy the message</Button>}
          </ClickToCopy>
        </div>
        <div className="footer-button">
          {!hideFooter && (
            <Button onClick={() => window.location.reload()} type="link">
              Continue To Dashboard
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WireTransferSuccessModal;
