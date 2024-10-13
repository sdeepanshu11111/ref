import { Button, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { bulkupdateApi } from "../../Apis/bulkupdate";
import {
  DownloadIcon,
  InfoBulbIcon,
  UploadDocIcon,
  UploadIcon,
} from "../../Icons";
import { HeaderSection } from "../HeaderSection";
import "./index.scss";
export const BulkUpdateCSV = ({ onClose }) => {
  const [uploadedFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const props = {
    name: "files",
    multiple: false,
    accept: ".csv,.xlsx",
    onRemove: () => {
      setUploadFile(null);
    },
    beforeUpload: (file) => {
      setUploadFile(file);
      return false;
    },
    maxCount: 1,
  };
  const handleSave = async () => {


    try {
      const formData = new FormData();
      formData.append("media[]", uploadedFile);
      formData.append("type", "csv");
      setLoading(true);
      const res = await bulkupdateApi(formData);
      message.success(res.msg);
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bulk-update-via-csv-container">
      <HeaderSection headingText="Bulk Update via CSV" onClose={onClose} />
      <div className="main-container">
        <div className="heading">Upload your orders’ CSV Files</div>
        <div>
          <Dragger {...props}>
            <div>
              <UploadDocIcon />
              <div className="text">Upload CSV File</div>
            </div>
          </Dragger>
        </div>
        <div className="footer-container">
          <a href="https://d24fzeiqvvundc.cloudfront.net/bulk_updates_csv/5e4c4c7b04a2fb968db31e49ac653738.xlsx">
            <Button
              type="primary"
              className="submit-btn"

              //   onClick={handleAddTag}
            >
              {" "}
              <DownloadIcon /> Download Sample CSV File
            </Button>
          </a>

          <Button
            type="primary"
            className="save-btn"
            onClick={handleSave}
            loading={loading}
            disabled={!uploadedFile}
          >
            {" "}
            <UploadIcon /> Update Orders
          </Button>
        </div>
        <div className="info-box-container">
          <div>Use this Bulk CSV Action to:</div>
          <div>
            1. <span className="green"> Update</span> Customer Details
          </div>
          <div>
            2. <span className="vo">Add</span> Order Notes
          </div>
          <div>
            3. <span className="green"> Update</span> Order Tags
          </div>{" "}
          {/* <div>
            4. <span className="yellow"> Change</span> Order Status on vFulfill
          </div>{" "}
          <div>
            5. <span className="yellow"> Change</span> Order Payment Method
          </div> */}
          <div className="icon-container">
            <InfoBulbIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
