import React, { useState } from "react";
import { Card, Table, Form, Row, Col, Badge } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";

function ExpiringPoliciesReport({ policies = [], customers = [] }) {
  const [filterType, setFilterType] = useState("30");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const getMatches = () => {
    const now = new Date();

    if (filterType === "range" && date1 && date2) {
      const start = new Date(date1);
      const end = new Date(date2);

      return policies.filter(p => {
        const exp = new Date(p.expirationDate);
        return exp >= start && exp <= end;
      });
    }

    const futureDate = new Date();
    futureDate.setDate(now.getDate() + Number(filterType));

    return policies.filter(p => {
      const exp = new Date(p.expirationDate);
      return exp >= now && exp <= futureDate;
    });
  };

  const matches = getMatches();

  const getCustomerName = (id) => {
    const c = customers.find(cust => cust.id === id);
    return c?.name || "Unknown";
  };

  const getUrgencyBadge = (dateStr) => {
    const exp = new Date(dateStr);
    const now = new Date();
    const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 7) return <Badge bg="danger">Expiring Soon</Badge>;
    if (daysLeft <= 30) return <Badge bg="warning">Expires in {daysLeft}d</Badge>;
    return <Badge bg="secondary">Expires in {daysLeft}d</Badge>;
  };

  return (
    <Card className="shadow-sm mt-3">
      <Card.Body>
        <Card.Title className="mb-4 text-warning">
          <BiTimeFive /> Expiring Policies Report
        </Card.Title>

        {/* 🔍 Filter Controls */}
        <Form className="mb-3">
          <Row className="gy-2">
            <Col md={4}>
              <Form.Select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="7">Next 7 Days</option>
                <option value="30">Next 30 Days</option>
                <option value="60">Next 60 Days</option>
                <option value="range">Custom Date Range</option>
              </Form.Select>
            </Col>

            {filterType === "range" && (
              <>
                <Col md={4}>
                  <Form.Control
                    type="date"
                    placeholder="Start date"
                    value={date1}
                    onChange={e => setDate1(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="date"
                    placeholder="End date"
                    value={date2}
                    onChange={e => setDate2(e.target.value)}
                  />
                </Col>
              </>
            )}
          </Row>
        </Form>

        {/* 📋 Results Table */}
        {matches.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Policy #</th>
                <th>Customer</th>
                <th>Expiration Date</th>
                <th>Status</th>
                <th>Send Reminder</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(p => (
                <tr key={p.policyNumber}>
                  <td>{p.policyNumber}</td>
                  <td>{getCustomerName(p.customerId)}</td>
                  <td>{p.expirationDate}</td>
                  <td>{getUrgencyBadge(p.expirationDate)}</td>
                  <td>
                    <button className="btn btn-sm btn-warning">
                      Compose Expiration Letter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No policies found for selected filter.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExpiringPoliciesReport;
