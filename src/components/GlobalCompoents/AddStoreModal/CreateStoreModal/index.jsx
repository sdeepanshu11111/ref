import React from "react";
import { Button, Form, Input, Alert, Checkbox, Modal } from "antd";
import { SHOPIFY_NAME } from "../../../../../../constant";

import "./index.scss";
const CreateStoreModal = ({
  visible,
  createStoreHandler,
  onCancel,
  loading,
}) => {
  // form handlers

  const onFinishFailed = (errorInfo) => {};

  return (
    <Modal
      title="Connect Your Shopify Store"
      className="create-store-modal"
      open={visible}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
    >
      <div className="create-store-modal-content">
        <Form
          className="login-form"
          name="basic"
          onFinish={(val) => createStoreHandler(val)}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Alert
            style={{ marginBottom: 12 }}
            message={`You will be redirected to Shopify to connect your store with us.`}
            type="info"
            showIcon
          />

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
              placeholder="Enter Store Shop URL"
              suffix=".myshopify.com"
            />
          </Form.Item>
          <Form.Item className="custom-footer">
            <Button
              onClick={((e) => e.preventDefault, onCancel)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              className="submit-button"
              type="primary"
              htmlType="submit"
            >
              Connect Store
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default CreateStoreModal;
