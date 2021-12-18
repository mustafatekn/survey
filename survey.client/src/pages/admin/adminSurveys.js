import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "../../components/layout/Sidebar";
import AdminSurveys from "../../components/admin/AdminSurveys";

export default function adminSurveys() {
  return (
    <Row className="p-0 m-0">
      <Col md={2}>
        <Sidebar />
      </Col>
      <Col md={10}>
        <AdminSurveys />
      </Col>
    </Row>
  );
}
