import classNames from "classnames";
import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
export default function PostSurvey() {
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);

  const toggleDescriptionVisibility = () => {
    if (descriptionVisibility === false) {
      setDescriptionVisibility(true);
    } else {
      setDescriptionVisibility(false);
    }
  };

  return (
    <Form
      className="border border-1 p-4 rounded-3 mt-5 w-50 mx-auto"
      method="POST"
    >
      <Row>
        <Col md={4}><h5>Post a survey!</h5></Col>
        <Col md={8}><Button
        type="button"
        id="descriptionVisibilityButton"
        size="sm"
        className={classNames('d-block ms-auto mb-3 ',
          descriptionVisibility ? "bg-danger" : "bg-black"
        )}
        onClick={toggleDescriptionVisibility}
      >
        {descriptionVisibility ? "Remove Description" : "Write a description"}
      </Button></Col>
      </Row>
      
      
      
      <FormGroup>
        <Label for="questionInput">Question</Label>
        <Input id="questionInput" name="question" type="text" />
      </FormGroup>

      <FormGroup
        className={classNames(descriptionVisibility ? "d-block" : "d-none")}
      >
        <Label for="descriptionInput">Description</Label>
        <Input id="descriptionInput" name="description" type="text"/>
      </FormGroup>

      <Button type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );
}
