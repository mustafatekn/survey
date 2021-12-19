import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

export default function Survey({ survey }) {
  return (
    <Card className="my-5 mx-auto w-75">
      <CardHeader className="px-3">{survey.question}</CardHeader>
      <CardText className="px-3 my-2">{survey.description}</CardText>
      <ListGroup className="my-">
        {survey.choices &&
          survey.choices.map((choice) => (
            <ListGroupItem key={choice.id} color="primary">
              {choice.name}
            </ListGroupItem>
          ))}
      </ListGroup>
      <CardFooter className="mt-3">{survey.createdAt}</CardFooter>
    </Card>
  );
}
