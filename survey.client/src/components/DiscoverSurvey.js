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
export default function DiscoverSurvey({ discoverSurvey }) {
  return (
    <Card className="w-50 my-4 mx-auto">
      <CardBody>
        <CardTitle tag="h5">{discoverSurvey.question}</CardTitle>
        <CardText>{discoverSurvey.description}</CardText>

        <ListGroup>
          {discoverSurvey.choices.map((choice) => (
            <ListGroupItem
              key={choice.id}
              className="my-1 rounded border border-1"
            >
              {choice.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
      <CardFooter>
        <span className="text-muted">{discoverSurvey.createdAt}</span>
      </CardFooter>
    </Card>
  );
}
