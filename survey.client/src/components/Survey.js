import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
export default function Survey({ survey }) {
  return (
    <Card className="w-50 my-4 mx-auto">
      <CardBody>
        <CardTitle tag="h5">{survey.question}</CardTitle>
        <CardText>{survey.description}</CardText>

        <ListGroup>
          {survey.choices.map((choice) => (
            <ListGroupItem key={choice.id} className="my-1 rounded border border-1">{choice.name}</ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
      <CardFooter>
        <span className="text-muted">{survey.createdAt}</span>
      </CardFooter>
    </Card>
  );
}
