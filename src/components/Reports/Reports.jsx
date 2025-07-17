import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BiCalendar, BiUserCheck, BiMessageRoundedDetail } from "react-icons/bi";


function Reports() {
  return (
    <Container className="reports-page my-4">
      <h3 className="mb-4 text-primary">Customer Engagement Reports</h3>

      <Row className="gy-4">
        {/* 🎂 Birthdays Report */}
        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 report-card">
            <Card.Body>
              <Card.Title><BiCalendar /> Birthdays Today</Card.Title>
              <Card.Text>Celebrate customers on their special day with a personalized birthday message.</Card.Text>
              <Button as={Link} to="/reports/birthdays" variant="primary">
                View Birthdays
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* 📅 Expiring Policies Report */}
        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 report-card">
            <Card.Body>
              <Card.Title><BiMessageRoundedDetail /> Expiring Policies</Card.Title>
              <Card.Text>Engage customers whose policies are nearing expiration. Offer renewals or policy reviews.</Card.Text>
              <Button as={Link} to="/reports/expiring" variant="primary">View Expiring Policies</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* 🟢 First Policy Status Report */}
        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 report-card">
            <Card.Body>
              <Card.Title><BiUserCheck /> First Policy Activity</Card.Title>
              <Card.Text>Track newly created policies and help agents follow up with first-time customers.</Card.Text>
              <Button as={Link} to="/reports/status" variant="primary">View First Policies</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Reports;
