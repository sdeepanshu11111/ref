import React from 'react';
import { Table, Button, Card,  Modal } from 'antd';
import CreateProgramModal from './CreateProgramModal';
import './index.scss';

const Programs = () => {


  const [visible, setVisible] = React.useState(false)

  const dataSource = [
    {
      key: '1',
      programName: 'Default Program',
      totalAffiliates: 100,
      totalReferrals: 500,
      totalRevenue: '$10,000',
      readyPayouts: '$1,000',
    },
    {
      key: '2',
      programName: 'VIP Program',
      totalAffiliates: 50,
      totalReferrals: 250,
      totalRevenue: '$25,000',
      readyPayouts: '$2,500',
    },
  ];

  const columns = [
    {
      title: 'Program Name',
      dataIndex: 'programName',
      key: 'programName',
    },
    {
      title: 'Total Affiliates',
      dataIndex: 'totalAffiliates',
      key: 'totalAffiliates',
    },
    {
      title: 'Total Referrals',
      dataIndex: 'totalReferrals',
      key: 'totalReferrals',
    },
    {
      title: 'Total Revenue',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
    },
    {
      title: 'Ready Payouts',
      dataIndex: 'readyPayouts',
      key: 'readyPayouts',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <Card className="programs-card">
      <h2 style={{padding : '10px' , fontSize : "22px" , fontWeight : "500"}}> Programs</h2>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="programs-table"
      />
      <Button onClick={()=>setVisible(true)} type="primary" className="create-program-btn">
        Create New Program
      </Button>
      <CreateProgramModal isModalOpen={visible} handleCancel={()=>setVisible(false)} />
    </Card>
  );
};

export default Programs;