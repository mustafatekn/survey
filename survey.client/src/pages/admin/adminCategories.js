import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Row, Col } from "reactstrap";
import AdminCategories from "../../components/admin/AdminCategories";

export default function adminCategories() {
  return (
      <Row className="p-0 m-0">
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <AdminCategories />
        </Col>
      </Row>
  );
}
