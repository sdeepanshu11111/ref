import { Button, Form, message } from "antd";
import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Arrow from "../../../../assets/Icons/Arrow";
import GlobalCustomInput from "../../../GlobalCompoents/GlobalCustomInput";
import { GlobalCustomSelect } from "../../../GlobalCompoents/GlobalCustomSelect";
import GlobalCustomTextArea from "../../../GlobalCompoents/GlobalCustomTextArea ";
import { updateCustomerInfoApi } from "../../Apis/updateCustomerInfo";
import {
  CountryCodePlaceholder,
  EditCustomerInfoIcon,
  RingIcon,
} from "../../Icons";
import OrdersContext from "../../OrdersContext";
import { HeaderSection } from "../HeaderSection";
import { OrderInfo } from "../OrderInfo";
import { stateOptions } from "./constants";
import "./index.scss";
export const EditCustomerInfoModal = ({ onClose }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({ contactno: "", prefix_1: "" });
  const { modal, orders, setOrders } = useContext(OrdersContext);
  const [loading, setLoading] = useState(false);

  let obj = modal?.data;
  const onFinish = async (values) => {
    const orderid = modal?.data?._id?.$oid;
    const storeid = modal?.data?.order_storeid?.$oid;
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

    let data = {
      storeid: storeid,
      orderid: orderid,
      customer_details: customer_details_keys,
      shipping_address: shipping_address_keys,
    };
    try {
      setLoading(true);
      const res = await updateCustomerInfoApi(data);
      if (res.success) {
        const orderid = modal?.data?._id?.$oid;
        setOrders((pre) => {
          let index = pre.findIndex((order) => order._id?.$oid == orderid);

          let arr = [...pre];

          arr[index].is_servicable = res.serviceable;

          return arr;
        });
        message.success(
          res?.msg || "Customer information updated successfully."
        );
      } else {
        message.error(res?.msg);
      }

      setOrders((pre) => {
        let index = pre.findIndex((order) => order._id?.$oid == orderid);

        let arr = [...pre];

        arr[index].shipping_address = {
          ...shipping_address_keys,
        };
        arr[index].customer_details = {
          ...customer_details_keys,
        };
        return arr;
      });
      onClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="order-info-edit-modal">
      {" "}
      <HeaderSection
        onClose={onClose}
        headingText="Edit Customer Info"
        headerIcon={<EditCustomerInfoIcon />}
      />
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
              <GlobalCustomInput addonBefore={"Phone Number *"} type="number" />
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
          {/* <div className="footer-bar-container">
            <span className="icon-container">
              <RingIcon />
            </span>{" "}
            <span>
              In case of any confusion, please refer to Guidelines for{" "}
              <a href="#">Customer Forms.</a>{" "}
            </span>
          </div> */}
          <Form.Item>
            <div className="footer-container">
              <Button
                className="submit-btn"
                style={{ width: "100%" }}
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                <span className="icon-container">
                  <EditCustomerInfoIcon />
                </span>{" "}
                Save Customer Info
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
