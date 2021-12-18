import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Row, Col } from "reactstrap";

export default function admin() {
  return (
      <Row className="p-0 m-0">
        <Col md={2}>
         <Sidebar/>
        </Col>
        <Col md={10}>asdasd</Col>
      </Row>
  );
}
