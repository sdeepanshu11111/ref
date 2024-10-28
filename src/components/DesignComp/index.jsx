import React, { useState } from 'react';
import { Layout, Input, Upload, Button, Select, Collapse } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Sider, Content } = Layout;
const { Panel } = Collapse;
const { Option } = Select;

const ReferralEditor = () => {
  // State for branding settings
  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#697689');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontType, setFontType] = useState('Arial');
  
  // State for content settings
  const [headingText, setHeadingText] = useState('Refer friends. Get rewards.');
  const [bodyText, setBodyText] = useState('Give your friends a 25% discount. Get a reward when they shop with your link.');

  // Handle logo upload
  const handleLogoUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setLogoUrl(reader.result);
    };
    reader.readAsDataURL(file.originFileObj);
  };

  // Handle banner upload
  const handleBannerUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBannerUrl(reader.result);
    };
    reader.readAsDataURL(file.originFileObj);
  };

  return (
    <Layout className="h-screen">
      {/* Editor Section */}
      <Sider width={300} className="bg-white p-4 border-r border-gray-200">
        <Collapse defaultActiveKey={['1', '2']}>
          {/* Branding Section */}
          <Panel header="Branding" key="1">
            {/* Logo Upload */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Logo</label>
              <Upload 
                showUploadList={false}
                beforeUpload={() => false} // Prevent auto-upload
                onChange={handleLogoUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
              {logoUrl && <img src={logoUrl} alt="Logo" className="mt-2 h-12 w-auto" />}
            </div>

            {/* Banner Upload */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Banner</label>
              <Upload 
                showUploadList={false}
                beforeUpload={() => false} 
                onChange={handleBannerUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
              {bannerUrl && <img src={bannerUrl} alt="Banner" className="mt-2 w-full h-20 object-cover" />}
            </div>

            {/* Primary Color Picker */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Primary Color</label>
              <Input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)} 
                className="w-full"
              />
            </div>

            {/* Font Color Picker */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Font Color</label>
              <Input 
                type="color" 
                value={fontColor} 
                onChange={(e) => setFontColor(e.target.value)} 
                className="w-full"
              />
            </div>

            {/* Font Type Selector */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Font Type</label>
              <Select 
                value={fontType} 
                onChange={(value) => setFontType(value)} 
                className="w-full"
              >
                <Option value="Arial">Arial</Option>
                <Option value="Verdana">Verdana</Option>
                <Option value="Times New Roman">Times New Roman</Option>
              </Select>
            </div>
          </Panel>

          {/* Content Section */}
          <Panel header="Content" key="2">
            {/* Heading Text */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Heading Text</label>
              <Input 
                value={headingText} 
                onChange={(e) => setHeadingText(e.target.value)} 
              />
            </div>

            {/* Body Text */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Body Text</label>
              <Input.TextArea 
                value={bodyText} 
                onChange={(e) => setBodyText(e.target.value)} 
                rows={4}
              />
            </div>
          </Panel>
        </Collapse>
      </Sider>

      {/* Preview Section */}
      <Content className="p-8 bg-gray-50 flex flex-col items-center justify-center">
        <div 
          className="w-96 p-4 rounded-lg shadow-md text-center"
          style={{
            backgroundColor: primaryColor,
            color: fontColor,
            fontFamily: fontType,
          }}
        >
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-12 w-auto mx-auto mb-4" />}
          {bannerUrl && <img src={bannerUrl} alt="Banner" className="w-full h-24 object-cover mb-4" />}
          <h1 className="text-xl font-bold">{headingText}</h1>
          <p className="mt-2">{bodyText}</p>
          <Button className="mt-4" type="primary">Get Invite Link</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default ReferralEditor;
