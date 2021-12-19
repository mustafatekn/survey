import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Row, Col } from "reactstrap";
import AdminWelcome from "../../components/admin/AdminWelcome";
export default function admin() {
  return (
    <Row className="p-0 m-0">
      <Col md={2}>
        <Sidebar />
      </Col>
      <Col md={10}>
        <AdminWelcome />
      </Col>
    </Row>
  );
}
