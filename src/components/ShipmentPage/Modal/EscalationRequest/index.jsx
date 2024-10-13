import { Button, message, Spin, Upload } from "antd";
import React, { useContext, useState } from "react";
import Arrow from "../../../../assets/Icons/Arrow";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { AlertYellow } from "../../../Orders/Icons";
import { raiseEcalaltion } from "../../Apis/raiseEcalaltion";
import { uploadMediaApi } from "../../Apis/uploadMediaApi";

import { UploadMediaIcon } from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import { escalationActionOption, reasonsOption } from "./constant";
import "./index.scss";
const { Dragger } = Upload;
export const EscalationRequest = ({ onClose }) => {
  const { modal } = useContext(OrdersContext);
  const [uploadedFile, setUploadFile] = useState([]);
  const [reason, setReason] = useState();
  const [desireAction, setDesireAction] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const props = {
    name: "files",
    multiple: false,
    accept: ".jpg,.png,.web,.wav,.mp4,.gif,.mp3,.asc,.wmv,.avi,.mkv",
    onRemove: (file) => {
      setUploadFile((pre) => {
        return pre.filter((url) => url !== file.udi);
      });
    },
    beforeUpload: (file) => {
      (async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          setLoadingUpload(true);
          const url = await uploadMediaApi(formData);

          setUploadFile((pre) => {
            return [...pre, url.file];
          });
          setLoadingUpload(false);
        } catch (e) {
          message.error(e.message);
          setLoadingUpload(false);
        }
      })();

      return false;
    },
    fileList: uploadedFile.map((file) => {
      return { udi: file, name: file };
    }),
  };
  const handleRaiseEscalation = async () => {
    setLoading(true);
    try {
      const data = {
        storeid: modal.data.obj?.store_id["$oid"],
        files: uploadedFile,
        reason,
        description,
        items: modal.data.items,
        shipment_vfid: modal.data?.obj?.shipment_vfid,
        escalation_action: desireAction,
      };
      let result = await raiseEcalaltion(data);
      message.success(result.msg || "Success");
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="escalation-shipment-modal-Container">
      {" "}
      <HeaderSection onClose={onClose} headingText="Raise Escalation" />
      <OrderInfo obj={modal.data.obj} />
      <div className="main-data-container">
        <div className="select-container">
          <GlobalCustomSelect
            label="Escalation Reason"
            options={reasonsOption}
            placeholder="Select a valid escalation reason"
            suffixIcon={<Arrow />}
            value={reason}
            onChange={(e) => setReason(e)}
          />
        </div>
        <div className="select-container">
          <GlobalCustomSelect
            label="Desired Outcome From Escalation"
            options={escalationActionOption}
            placeholder="Select a valid escalation reason"
            suffixIcon={<Arrow />}
            value={desireAction}
            onChange={(e) => setDesireAction(e)}
          />
        </div>
        <div className="select-container">
          {" "}
          <GlobalCustomTextArea
            placeholder={"Please mention the reason for raising an escalation"}
            label={"Escalation Description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {loadingUpload ? (
          <Spin />
        ) : (
          <div className="dragger-container">
            <div className="heading">Upload your orders’ CSV Files</div>
            <div className="sub-heading">
              (Jpg, png, web, wav, mp4, gif, mp3, asc, wmv, avi, mkv)
            </div>
            <Dragger {...props}>
              <div>
                <UploadMediaIcon />
                <div className="text">Upload Image/ Video</div>
              </div>
            </Dragger>
          </div>
        )}
        <div className="info-bar-container">
          <div>
            <AlertYellow />
          </div>
          <div>
            <span>Important Guidelines:</span> Please upload the right media to
            allow us to take action on your escalation, otherwise the escalation
            will be marked obsolete.
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Button
          type="primary"
          className="submit-btn"
          onClick={handleRaiseEscalation}
          loading={loading}
          disabled={
            !reason || !description || !desireAction || !uploadedFile.length
          }
        >
          {" "}
          Raise Escalation
        </Button>
      </div>
    </div>
  );
};
