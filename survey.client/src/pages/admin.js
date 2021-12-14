import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Row, Col } from "reactstrap";

export default function admin() {
  return (
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} className="mt-5 py-5">asdasd</Col>
      </Row>
  );
}
