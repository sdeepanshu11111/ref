import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Radio, Switch, Select, Modal } from "antd";
import { motion } from "framer-motion";

const CreateProgramModal = ({ isModalOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  const handleAdvancedToggle = (checked) => {
    setShowAdvancedSettings(checked);
  };

  return (
    <Modal
      title="Program Creator"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        initialValues={{
          programName: "Default Program",
          commissionSetting: "cash",
          commissionType: "fixed",
          discountType: "fixed",
          landingPage: "home",
          trackingMethod: "discountCodes",
          couponCodeFormat: "First name + Unique Number",
          couponCodeExpiry: "30", // Default value for coupon expiry
          firstPurchaseOnly: true, // Toggle for "Only allow commission creation..."
          defaultProgram: false, // Toggle for "Make this default program applicable..."
          showAdvancedSettings: false,
          currency: "USD",
          firstPurchaseCommission: false, // Toggle in advanced settings
          programValidity: false, // Toggle for program validity
          discountCodeApplicableOn: "allCollections",
          discountCodeRestrictions: false, // Toggle for "Make discount codes applicable..."
          minCartValue: "0",
          singleUseCoupon: true, // Toggle for single use coupon
          stackCoupons: false, // Toggle for stacking coupons
          location: "allCountries",
          refereeCurrency: "allCurrencies",
        }}
      >
        {/* Program Name */}
        <Form.Item label="Program Name" name="programName">
          <Input placeholder="Enter program name" />
        </Form.Item>

        {/* Affiliate Commission Section */}
        <div className="border p-4 mb-4 rounded-md shadow-sm">
          <h3 className="text-lg mb-3">Affiliate Commission</h3>
          <Form.Item label="Commission Setting" name="commissionSetting">
            <Radio.Group>
              <Radio value="cash">Cash</Radio>
              <Radio value="storeCredit">Store Credit</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Commission Type" name="commissionType">
            <Radio.Group>
              <Radio value="fixed">Fixed</Radio>
              <Radio value="percentage">Percentage</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Commission Amount" name="commissionAmount">
            <Input placeholder="Enter amount" />
          </Form.Item>

          {/* Switches */}
          <Form.Item name="firstPurchaseOnly" valuePropName="checked">
            <Switch /> Only allow commission creation for a customer's first purchase
          </Form.Item>

          <Form.Item name="defaultProgram" valuePropName="checked">
            <Switch /> Make this default program applicable to all customers
          </Form.Item>
        </div>

        {/* Friend's Discount Section */}
        <div className="border p-4 mb-4 rounded-md shadow-sm">
          <h3 className="text-lg mb-3">Friend's Discount (Referred Discount)</h3>
          <Form.Item label="Discount Type" name="discountType">
            <Radio.Group>
              <Radio value="fixed">Fixed</Radio>
              <Radio value="percentage">Percentage</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Discount Amount" name="discountAmount">
            <Input placeholder="Enter amount" />
          </Form.Item>

          <Form.Item label="Landing Page" name="landingPage">
            <Select placeholder="Select landing page">
              <Select.Option value="home">Home Page</Select.Option>
              <Select.Option value="product">Product Page</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tracking Method" name="trackingMethod">
            <Radio.Group>
              <Radio value="discountCodes">Discount Codes</Radio>
              <Radio value="referralLinks">Referral Links</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Coupon Code Format" name="couponCodeFormat">
            <Input placeholder="First name + Unique Number" />
          </Form.Item>

          <Form.Item label="Coupon Code Expiry (days)" name="couponCodeExpiry">
            <Input placeholder="Enter number of days" />
          </Form.Item>
        </div>

        {/* Advanced Settings Toggle */}
        <div className="border p-4 mb-4 rounded-md shadow-sm">
          <h3 className="text-lg mb-3">Advanced Settings</h3>
          <Form.Item label="Show Advanced Settings">
            <Switch checked={showAdvancedSettings} onChange={handleAdvancedToggle} />
          </Form.Item>

          {showAdvancedSettings && (
            <>
              {/* Advanced Settings Section */}
              <Form.Item label="Currency" name="currency">
                <Select placeholder="Select currency">
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="EUR">EUR</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="firstPurchaseCommission" valuePropName="checked">
                <Switch /> Only create commissions for customer's first purchase
              </Form.Item>

              <Form.Item name="programValidity" valuePropName="checked">
                <Switch /> Set Program Validity
              </Form.Item>

              <Form.Item label="Discount Code Applicable On" name="discountCodeApplicableOn">
                <Select placeholder="Select applicability">
                  <Select.Option value="allCollections">All Collections</Select.Option>
                  <Select.Option value="specificCollections">Specific Collections</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="discountCodeRestrictions" valuePropName="checked">
                <Switch /> Make discount codes applicable only to customers who have not purchased
              </Form.Item>

              <Form.Item label="Minimum Cart Value Requirements" name="minCartValue">
                <Input placeholder="0" />
              </Form.Item>

              <Form.Item name="singleUseCoupon" valuePropName="checked">
                <Switch /> Don't allow the affiliate coupon codes to be used multiple times per customer
              </Form.Item>

              <Form.Item name="stackCoupons" valuePropName="checked">
                <Switch /> Don't allow coupons to be used with any other coupons
              </Form.Item>

              {/* Referee Segmentation Section */}
              <div className="border-t pt-4 mt-4">
                <h4>Referee Segmentation</h4>

                <Form.Item label="Location" name="location">
                  <Select placeholder="Select location">
                    <Select.Option value="allCountries">All Countries</Select.Option>
                    <Select.Option value="specificCountries">Specific Countries</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Currency" name="refereeCurrency">
                  <Select placeholder="Select currency">
                    <Select.Option value="allCurrencies">All Currencies</Select.Option>
                    <Select.Option value="specificCurrencies">Specific Currencies</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Total Spent Range" name="spentRange">
                  <Input.Group compact>
                    <Input style={{ width: "50%" }} placeholder="Min" />
                    <Input style={{ width: "50%" }} placeholder="Max" />
                  </Input.Group>
                </Form.Item>

                <Form.Item label="Number of Orders Range" name="ordersRange">
                  <Input.Group compact>
                    <Input style={{ width: "50%" }} placeholder="Min" />
                    <Input style={{ width: "50%" }} placeholder="Max" />
                  </Input.Group>
                </Form.Item>

                <Form.Item label="Total Referred Revenue Range" name="referredRevenueRange">
                  <Input.Group compact>
                    <Input style={{ width: "50%" }} placeholder="Min" />
                    <Input style={{ width: "50%" }} placeholder="Max" />
                  </Input.Group>
                </Form.Item>

                <Form.Item label="Total Referred Orders Range" name="referredOrdersRange">
                  <Input.Group compact>
                    <Input style={{ width: "50%" }} placeholder="Min" />
                    <Input style={{ width: "50%" }} placeholder="Max" />
                  </Input.Group>
                </Form.Item>
              </div>
            </>
          )}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProgramModal;
