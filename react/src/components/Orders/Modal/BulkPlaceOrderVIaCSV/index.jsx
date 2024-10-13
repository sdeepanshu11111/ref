import { Button, message, Upload } from "antd";
// import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { bulkPlaceOrderApi } from "../../Apis/bulkPlaceOrder";
import { bulkupdateApi } from "../../Apis/bulkupdate";
import {
  DownloadIcon,
  InfoBulbIcon,
  UploadDocIcon,
  UploadIcon,
} from "../../Icons";
import { HeaderSection } from "../HeaderSection";

import "./index.scss";

const { Dragger } = Upload;

export const BulkOrderPlaceViaCSV = ({ onClose, selectedStoreIds }) => {
  const [uploadedFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const props = {
    name: "files",
    multiple: false,
    accept: ".csv",
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
      formData.append("stores", JSON.stringify(selectedStoreIds));
      setLoading(true);
      const res = await bulkPlaceOrderApi(formData);
      message.success(
        "Bulk action In Progress. Please check your registered email for the bulk action results"
      );
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bulk-place-via-csv-container">
      <HeaderSection headingText="Bulk Place Order via CSV" onClose={onClose} />
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
          <a
            href="https://vfulfill.s3.ap-south-1.amazonaws.com/csv/sample_csvs/bulk_order_place_sample.csv"
            download
          >
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
            <UploadIcon /> Place Orders
          </Button>
        </div>
      </div>
    </div>
  );
};
