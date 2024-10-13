import { Button, Checkbox, DatePicker, Form, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";
import moment from "moment";
import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Arrow from "../../../../assets/Icons/Arrow";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { escalationOrReattemptApi } from "../../Apis/ escalationOrReattempt";
import { updateCustomerInfoApi } from "../../Apis/updateCustomerInfo";
import {
  AlertYellow,
  CountryCodePlaceholder,
  EditCustomerInfoIcon,
  RingIcon,
  UploadDocIco,
} from "../../Icons";
import OrdersContext from "../../NDRContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import { stateOptions } from "./constants";
import { FileBarContainer } from "./FileBarContainer";
import "./index.scss";
export const EscalationModal = ({ onClose }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({ contactno: "", prefix_1: "" });
  const { modal, setOrders, fetchData } = useContext(OrdersContext);
  const [loading, setLoading] = useState(false);
  const [reattemptcheckBox, setReattemptcheckBox] = useState(false);
  const [uploadedFile, setUploadFile] = useState([]);
  const props = {
    name: "files",
    multiple: true,
    accept: ".jpg,.png,.jpeg,.webp,.wav,.mp4,.gif,.mp3,.asc",
    onRemove: () => {
      setUploadFile(null);
    },
    beforeUpload: (file) => {
      setUploadFile((pre) => {
        let arr = [...pre];
        arr.push(file);
        return arr;
      });
      return false;
    },

    fileList: [],
  };
  let obj = modal?.data;
  const onFinish = async (values) => {
    console.log(values);

    if (!uploadedFile.length) {
      message.error("Please Upload Image/ Video ");
      return;
    }
    const storeid = modal?.data?.store_id?.$oid;
    const orderid = modal?.data?.order_id?.$oid;
    const shipmentid = modal?.data?.shipment_vfid;
    const formData = new FormData();
    formData.append("storeid", storeid);
    formData.append("orderid", orderid);
    formData.append("shipmentid", shipmentid);
    uploadedFile.forEach((file) => {
      formData.append("file[]", file);
    });
    formData.append("remarks", values?.remarks);

    if (reattemptcheckBox) {
      formData.append("date", values?.datePicker?.format("YYYY-MM-DD"));

      const shipping_address_keys = {
        ...obj?.shipping_address,
        phone: "91" + values.phone,
        address1: values.address1,
        address2: values.address2,
        zip: values.zip,
        province: values.province,
        city: values.city,
      };
      const customer_details_keys = {
        ...obj?.customer_details,
        name: values.name,
        email: values.email,
      };
      formData.append(
        "reattempt",
        JSON.stringify({
          customer_details: customer_details_keys,
          shipping_address: shipping_address_keys,
        })
      );
    }

    try {
      setLoading(true);
      const res = await escalationOrReattemptApi(formData);
      if (res.success) {
        message.success("Re-Attempt request created successfully!");
        fetchData();
        onClose();
      } else {
        message.error(res?.msg);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const disabledDate = (current) => {
    const currentDate = dayjs(current);

    // Disable dates before yesterday
    if (currentDate.isBefore(dayjs().subtract(1, "day").endOf("day"))) {
      return true;
    }

    // Disable dates after 7 days from today
    if (currentDate.isAfter(dayjs().add(7, "days").endOf("day"))) {
      return true;
    }

    // Disable Sundays (JavaScript's getDay returns 0 for Sunday)
    if (currentDate.day() === 0) {
      return true;
    }

    return false;
  };
  console.log(uploadedFile);
  return (
    <div className="ndr-EscalationModal-modal">
      {" "}
      <HeaderSection onClose={onClose} headingText="Raise Escalation" />
      <OrderInfo obj={obj} />
      <div className="customer-info-form-container">
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          scrollToFirstError={true}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="remarks"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <GlobalCustomTextArea
              label="Escalation Description"
              placeholder="Please mention the reason for raising an NDR escalation"
            />
          </Form.Item>
          <div className="upload-section-container">
            <div className="heading">Upload Attachments</div>
            <div className="sub-heading">
              (Jpg, png, web, wav, mp4, gif, mp3, asc, wmv, avi, mkv)
            </div>
            <div>
              <Dragger {...props}>
                <UploadDocIco />
                <div>
                  <div className="text">Upload Image/ Video</div>
                </div>
              </Dragger>
            </div>
            {!!uploadedFile.length && (
              <div>
                {uploadedFile.map((file, index) => {
                  return (
                    <FileBarContainer
                      file={file}
                      index={index}
                      setUploadFile={setUploadFile}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="bar-container">
            <div className="info-bar-container">
              <div>
                <AlertYellow />
              </div>
              <div>
                <span>Important Guidelines:</span> Please upload the right media
                to allow us to take action on your escalation, otherwise the
                escalation will be marked obsolete.
              </div>
            </div>
          </div>
          <div className="checkbox-container">
            <Checkbox
              checked={reattemptcheckBox}
              onChange={(e) => {
                setReattemptcheckBox(e.target?.checked);
              }}
            >
              Reattempt Delivery
            </Checkbox>
          </div>

          {reattemptcheckBox && (
            <>
              <div>Reattempt Delivery On *</div>
              <Form.Item
                name="datePicker"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select Date"
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                id="firstName"
                name="name"
                initialValue={obj?.customer_details?.name}
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  {
                    min: 3,
                    message: "",
                  },
                  {
                    message: "",
                    validator: (_, value) => {
                      if (value.trim()) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("");
                      }
                    },
                  },
                ]}
              >
                <GlobalCustomInput
                  placeholder="Enter customer name"
                  addonBefore={"Customer Name *"}
                />
              </Form.Item>
              <div className="holder">
                <CountryCodePlaceholder />
                <Form.Item
                  id="phone"
                  label=""
                  initialValue={
                    obj?.shipping_address?.phone.startsWith("91")
                      ? obj?.shipping_address?.phone.replace("91", "")
                      : obj?.shipping_address?.phone
                  }
                  name="phone"
                  className="phone-item"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                    {
                      min: 10,
                      message: "",
                    },
                    {
                      max: 10,
                      message: "",
                    },
                  ]}
                >
                  <GlobalCustomInput
                    addonBefore={"Phone Number *"}
                    type="number"
                  />
                </Form.Item>
              </div>
              <Form.Item
                id="email"
                name="email"
                initialValue={obj?.customer_details?.email}
                rules={[
                  { required: true, message: "" },
                  {
                    type: "email",
                    message: "",
                  },
                ]}
              >
                <GlobalCustomInput addonBefore={"Email Address *"} />
              </Form.Item>
              <Form.Item
                id="address_line_1"
                name="address1"
                initialValue={obj?.shipping_address?.address1.trim()}
                rules={[
                  { required: true, message: "" },
                  { max: 200, message: "" },
                  {
                    message: "",
                    validator: (_, value) => {
                      if (value.trim()) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("");
                      }
                    },
                  },
                ]}
              >
                <GlobalCustomTextArea
                  placeholder="Enter address line 1"
                  label={"Address Line 1 *"}
                />
              </Form.Item>
              <Form.Item
                id="address_line_2"
                name="address2"
                initialValue={obj?.shipping_address?.address2.trim()}
                rules={[]}
              >
                <GlobalCustomTextArea
                  placeholder="Enter address line 2"
                  label={"Address Line 2 *"}
                />
              </Form.Item>
              <Form.Item
                id="pin_code"
                name="zip"
                rules={[
                  { required: true, message: "" },
                  {
                    message: "",
                    validator: (_, value) => {
                      if (value.trim()) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("");
                      }
                    },
                  },
                ]}
                initialValue={obj?.shipping_address?.zip}
              >
                <GlobalCustomInput
                  addonBefore={"Pin Code *"}
                  placeholder="Enter pincode "
                  type="number"
                />
              </Form.Item>
              <div className="selector-row-container">
                <Form.Item
                  id="state"
                  name="province"
                  initialValue={obj?.shipping_address?.province}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <GlobalCustomSelect
                    label="State *"
                    options={stateOptions}
                    placeholder="Select state "
                    suffixIcon={<Arrow />}
                  />
                </Form.Item>
                <Form.Item
                  id="city"
                  name="city"
                  initialValue={obj?.shipping_address?.city}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <GlobalCustomInput
                    addonBefore={"City *"}
                    placeholder="Enter city"
                  />
                </Form.Item>
              </div>
            </>
          )}

          <Form.Item>
            <div className="footer-container">
              <Button
                className="submit-btn"
                style={{ width: "100%" }}
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                Raise Escalation
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
