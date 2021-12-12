import React from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col } from "reactstrap";
import AdminCategories from "../components/admin/AdminCategories";

export default function adminCategories() {
  return (
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <AdminCategories />
        </Col>
      </Row>
  );
}
