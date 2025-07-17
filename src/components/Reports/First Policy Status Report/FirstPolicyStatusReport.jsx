import React, { useState } from "react";
import { Card, Table, Form, Row, Col, Badge } from "react-bootstrap";
import { BiCheckShield } from "react-icons/bi";

function FirstPolicyStatusReport({ customers = [], policies = [] }) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge bg="success">Active</Badge>;
      case "Expired":
        return <Badge bg="danger">Expired</Badge>;
      case "Pending":
        return <Badge bg="warning">Pending</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const firstPolicies = customers.map(customer => {
    const relatedPolicies = policies
      .filter(p => p.customerId === customer.id)
      .sort((a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate));

    const first = relatedPolicies[0];
    return { customer, firstPolicy: first || null };
  });

  const filteredPolicies = firstPolicies.filter(({ firstPolicy }) => {
    if (selectedStatus === "all") return true;
    return firstPolicy?.status === selectedStatus;
  });

  return (
    <Card className="shadow-sm mt-3">
      <Card.Body>
        <Card.Title className="mb-4 text-success">
          <BiCheckShield /> First Policy Status Report
        </Card.Title>

        {/* 🔍 Status Filter */}
        <Form className="mb-3">
          <Row className="gy-2">
            <Col md={4}>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* 📋 Status Table */}
        {filteredPolicies.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Policy #</th>
                <th>Status</th>
                <th>Effective Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.map(({ customer, firstPolicy }) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{firstPolicy?.policyNumber || "—"}</td>
                  <td>
                    {firstPolicy
                      ? getStatusBadge(firstPolicy.status)
                      : <Badge bg="secondary">No Policies</Badge>}
                  </td>
                  <td>{firstPolicy?.effectiveDate || "—"}</td>
                  <td>
                    {firstPolicy ? (
                      <button className="btn btn-sm btn-outline-success">
                        Create Follow-Up Message
                      </button>
                    ) : (
                      <span className="text-muted">No policies</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No customers found for selected status.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default FirstPolicyStatusReport;

