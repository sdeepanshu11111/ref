import React, { useState } from "react";
import { Button, Form, Input, Alert, Checkbox, Modal, message } from "antd";
import { SHOPIFY_CLIENT_ID } from "../../../../constant";
import "./index.scss";
import { CrossIcon } from "../../../../assets/Icons/CrossIcon";
import { YellowIcon } from "../../../../assets/Icons/YellowIcon";
import axios from "axios";
export const ShopifyCommerce = ({ onClose, setCurrentScreen }) => {
  const [loading, setLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {};
  const createStoreHandler = (val) => {
    setLoading(true);

    axios({
      url: import.meta.env.VITE_REACT_API_URL + "/store/add_store",
      method: "post",
      data: {
        shop: val.shop,
      },
      withCredentials: true,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.success === 1) {
          let str2 =
            `https://${val.shop}.myshopify.com/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=read_product_listings,read_products,write_products,read_orders,write_orders,read_inventory,write_customers,write_inventory,write_price_rules,read_draft_orders,write_draft_orders,read_customers,write_customers,read_checkouts,write_checkouts,read_fulfillments,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,write_fulfillments&redirect_uri=` +
            import.meta.env.VITE_REACT_API_URL +
            `/login/shopify_callback&state=${res.data.id}`;
          window.location = str2;
        } else {
          message.error(res.data.msg);
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
    <div className="create-store-modal-content">
      <div className="title-container">
        <div className="heading">Link Shopify Store</div>
        <Button
          type="text"
          className="external-link"
          icon={<CrossIcon />}
          onClick={onClose}
        />
      </div>
      <div className="form-container">
        <div className="info-bar-container">
          <div>
            <YellowIcon />
          </div>
          <div>You will be redirected to Shopify to authorize vFulfill.</div>
        </div>

        <Form
          name="basic"
          onFinish={(val) => createStoreHandler(val)}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <div className="input-heading">Enter the URL of your Store</div>
          <Form.Item
            name="shop"
            rules={[
              {
                required: true,
                type: "string",
                pattern: "^[a-z0-9-]+$",
                message: "Please enter a valid Store Shop URL",
              },
            ]}
          >
            <Input
              // addonBefore="https://"
              size="small"
              type="text"
              placeholder="store-name"
              suffix=".myshopify.com"
            />
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
