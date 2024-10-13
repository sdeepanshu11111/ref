import React from 'react';
import { Table, Button, Card, Row, Col } from 'antd';
import './index.scss';
// import Dashboard from '../index';

const Payout = () => {
  const dataSource = [
    {
      key: '1',
      affiliate: 'Alice Williams',
      convertedReferrals: 100,
      revenueGenerated: '$10,000',
      totalEarned: '$1,000',
      paid: '$500',
      unpaid: '$500',
      ready: '$250',
    },
    {
      key: '2',
      affiliate: 'Bob Johnson',
      convertedReferrals: 75,
      revenueGenerated: '$7,500',
      totalEarned: '$750',
      paid: '$300',
      unpaid: '$450',
      ready: '$200',
    },
  ];

  const columns = [
    {
      title: 'Affiliate',
      dataIndex: 'affiliate',
      key: 'affiliate',
    },
    {
      title: 'Converted Referrals',
      dataIndex: 'convertedReferrals',
      key: 'convertedReferrals',
    },
    {
      title: 'Revenue Generated',
      dataIndex: 'revenueGenerated',
      key: 'revenueGenerated',
    },
    {
      title: 'Total Earned',
      dataIndex: 'totalEarned',
      key: 'totalEarned',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Unpaid',
      dataIndex: 'unpaid',
      key: 'unpaid',
    },
    {
      title: 'Ready',
      dataIndex: 'ready',
      key: 'ready',
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: () => <Button type="link">View Details</Button>,
    },
  ];

  return (
    <Card className="payout-card">
      <h2 style={{padding : '10px' , fontSize : "22px" , fontWeight : "500"}}>Payout Summary</h2>
      <Row gutter={16} className="summary-row">
        <Col span={8}>
          <Card className="summary-card">
            <h3>Total Paid Payouts</h3>
            <p>$50,000</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="summary-card">
            <h3>Total Unpaid Payouts</h3>
            <p>$10,000</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="summary-card">
            <h3>Total Ready Payouts</h3>
            <p>$5,000</p>
          </Card>
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="payout-table"
      />
      <div className="action-buttons">
        <Button type="primary">Pay All Ready Payouts</Button>
        <Button style={{ marginLeft: '10px' }}>Export Report</Button>
      </div>
    </Card>
  );
};

export default Payout;
