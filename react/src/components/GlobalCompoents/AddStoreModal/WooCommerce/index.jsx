import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./index.scss";
import { CrossIcon } from "../../../../assets/Icons/CrossIcon";
import axios from "axios";

export const WooCommerce = ({ onClose, setCurrentScreen }) => {
  const [loading, setLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {};
  const createStoreHandler = (details) => {
    let data = { ...details };

    function validURL(str) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }
    if (!validURL(data.shop_url)) {
      message.error("Please provide a valid URL");
      return;
    }

    setLoading(true);
    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/store/add_woocommerce_store",
      method: "post",
      data: {
        ...data,
      },
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.success === 1) {
          message.success("Store successfully connected");
          onClose();
        }
      })
      .catch((err) => {
        message.error(err.message);

        setLoading(false);
      });
  };
  const handlegoBACK = () => {
    setCurrentScreen("storeType");
  };

  return (
    <div className="create-store-modal-content-woocommerce">
      <div className="title-container">
        <div className="heading">Add new WooCommerce Store</div>
        <Button
          type="text"
          className="external-link"
          icon={<CrossIcon />}
          onClick={onClose}
        />
      </div>
      <div className="form-container">
        <Form
          name="basic"
          onFinish={(val) => createStoreHandler(val)}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <div className="input-heading">Enter the URL of your Store</div>
          <Form.Item
            name="shop_name"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input type="text" placeholder="Enter your shop name" />
          </Form.Item>
          <div className="input-heading"> Shop URL</div>
          <Form.Item
            name="shop_url"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input type="text" placeholder="Enter Shop URL" />
          </Form.Item>
          <div className="input-heading">Shop Consumer Key</div>
          <Form.Item
            name="shop_consumer_key"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input type="text" placeholder="Enter Shop Consumer key" />
          </Form.Item>
          <div className="input-heading"> Shop Consumer Secret</div>
          <Form.Item
            name="shop_consumer_secret"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input type="text" placeholder="Enter your shop name" />
          </Form.Item>
          <Form.Item className="custom-footer">
            <Button
              onClick={((e) => e.preventDefault, handlegoBACK)}
              className="cancel-button"
            >
              Go Back
            </Button>
            <Button
              loading={loading}
              className="submit-btn"
              type="primary"
              htmlType="submit"
            >
              Connect Store
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
