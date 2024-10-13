import React from 'react';
import { Card, Row, Col, Button, Table } from 'antd';

const Home = () => {
  // Data for tables
  const pendingPayoutsData = [
    { key: '1', affiliate: 'John Doe', sales: '$1,234', referrals: 12, payout: '$123' },
    { key: '2', affiliate: 'Jane Smith', sales: '$2,345', referrals: 23, payout: '$234' },
    { key: '3', affiliate: 'Bob Johnson', sales: '$3,456', referrals: 34, payout: '$345' },
  ];

  const topAffiliatesData = [
    { key: '1', affiliate: 'Alice Williams', sales: '$5,678', payout: '$567' },
    { key: '2', affiliate: 'Charlie Brown', sales: '$4,567', payout: '$456' },
    { key: '3', affiliate: 'David Miller', sales: '$3,456', payout: '$345' },
  ];

  const columnsPending = [
    { title: 'Affiliate', dataIndex: 'affiliate', key: 'affiliate' },
    { title: 'Sales', dataIndex: 'sales', key: 'sales' },
    { title: 'Referrals', dataIndex: 'referrals', key: 'referrals' },
    { title: 'Payout', dataIndex: 'payout', key: 'payout' },
  ];

  const columnsTop = [
    { title: 'Affiliate', dataIndex: 'affiliate', key: 'affiliate' },
    { title: 'Sales', dataIndex: 'sales', key: 'sales' },
    { title: 'Payout', dataIndex: 'payout', key: 'payout' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Affiliates" bordered={false}>
            <p>1,234</p>
            <a href="/">View Affiliates</a>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Revenue" bordered={false}>
            <p>$45,678</p>
            <a href="/">View Payouts</a>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending Payouts" bordered={false}>
            <p>$12,345</p>
            <a href="/">View Payouts</a>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Card title="Pending Payouts" bordered={false}>
            <Table dataSource={pendingPayoutsData} columns={columnsPending} pagination={false} />
            <Button type="primary" style={{ marginTop: '10px' }}>View All Payouts</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Top Affiliates" bordered={false}>
            <Table dataSource={topAffiliatesData} columns={columnsTop} pagination={false} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Button type="default" style={{ marginRight: '10px' }}>Create Program</Button>
        <Button type="default">Add Affiliate</Button>
      </Row>
    </div>
  );
};

export default Home;
