import React from 'react';
import { Card, Table, Button } from 'antd';

const Programs = () => {
  // Data for the affiliate programs table
  const programsData = [
    { key: '1', programName: 'Default Program', affiliates: 100, referrals: 500, revenue: '$10,000', payouts: '$1,000', action: 'Edit' },
    { key: '2', programName: 'VIP Program', affiliates: 50, referrals: 250, revenue: '$25,000', payouts: '$2,500', action: 'Edit' },
  ];

  const columns = [
    { title: 'Program Name', dataIndex: 'programName', key: 'programName' },
    { title: 'Total Affiliates', dataIndex: 'affiliates', key: 'affiliates' },
    { title: 'Total Referrals', dataIndex: 'referrals', key: 'referrals' },
    { title: 'Total Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Ready Payouts', dataIndex: 'payouts', key: 'payouts' },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <a href="/">Edit</a>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Affiliate Programs" bordered={false}>
        <Table dataSource={programsData} columns={columns} pagination={false} />
        <Button type="primary" style={{ marginTop: '10px', backgroundColor: '#5b21b6', borderColor: '#5b21b6' }}>
          Create New Program
        </Button>
      </Card>
    </div>
  );
};

export default Programs;
