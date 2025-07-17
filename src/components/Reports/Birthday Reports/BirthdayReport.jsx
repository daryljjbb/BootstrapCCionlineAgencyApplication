import React, { useState } from "react";
import { Card, Table, Form, Row, Col } from "react-bootstrap";
import { BiCake } from "react-icons/bi";

function BirthdaysReport({ customers = [] }) {
  const [filterType, setFilterType] = useState("month");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const getMatches = () => {
    if (!customers.length) return [];

    if (filterType === "day" && date1) {
      const target = new Date(date1).toISOString().slice(5, 10);
      return customers.filter(c => c.birthDate?.slice(5, 10) === target);
    }

    if (filterType === "month" && date1) {
      const targetMonth = new Date(date1).getMonth(); // 0-based
      return customers.filter(c =>
        new Date(c.birthDate).getMonth() === targetMonth
      );
    }

    if (filterType === "range" && date1 && date2) {
      const start = new Date(date1);
      const end = new Date(date2);
      return customers.filter(c => {
        const birth = new Date(c.birthDate);
        return birth >= start && birth <= end;
      });
    }

    if (filterType === "week") {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);
      return customers.filter(c => {
        const birth = new Date(c.birthDate);
        const thisYearBirthday = new Date(
          now.getFullYear(),
          birth.getMonth(),
          birth.getDate()
        );
        return thisYearBirthday >= now && thisYearBirthday <= nextWeek;
      });
    }

    return [];
  };

  const birthdayMatches = getMatches();

  return (
    <Card className="shadow-sm mt-3">
      <Card.Body>
        <Card.Title className="mb-4 text-primary">
          <BiCake /> Birthday Report
        </Card.Title>

        {/* 🔍 Filter Controls */}
        <Form className="mb-3">
          <Row className="gy-2">
            <Col md={4}>
              <Form.Select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="day">On a Specific Day</option>
                <option value="month">Within a Month</option>
                <option value="range">Between Dates</option>
                <option value="week">Next 7 Days</option>
              </Form.Select>
            </Col>

            {filterType === "day" && (
              <Col md={4}>
                <Form.Control
                  type="date"
                  value={date1}
                  onChange={e => setDate1(e.target.value)}
                />
              </Col>
            )}

            {filterType === "month" && (
              <Col md={4}>
                <Form.Control
                  type="month"
                  value={date1}
                  onChange={e => setDate1(e.target.value)}
                />
              </Col>
            )}

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

        {/* 📋 Report Table */}
        {birthdayMatches.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Birth Date</th>
                <th>Send Message</th>
              </tr>
            </thead>
            <tbody>
              {birthdayMatches.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.birthDate}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      Compose Birthday Letter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No birthdays found for selected filter.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default BirthdaysReport;

