import React from "react";
import { Card, CardBody, CardTitle, CardText, CardFooter } from "reactstrap";
export default function Survey({ survey }) {
  return (
    <Card className="w-50 mb-4">
      <CardBody>
        <CardTitle tag="h5">{survey.question}</CardTitle>
        <CardText>{survey.description}</CardText>
      </CardBody>
      <CardFooter>
        <span className="text-muted">{survey.createdAt}</span>
      </CardFooter>
    </Card>
  );
}
