import React from "react";
import { InputGroup, Button, Input } from "reactstrap";
export default function ChoiceInput({ quantity, survey, setSurvey }) {
  return (
    <div>
      {Array.from(Array(quantity), (e, i) => {
        return (
          <InputGroup className="mb-2" key={i}>
            <Input type="text" name="choice" key={i} />
            <Button
              color="danger"
              onClick={(e) => {
                const inputGroup = e.target.parentNode;
                inputGroup.parentNode.removeChild(inputGroup);
              }}
            >
              -
            </Button>
          </InputGroup>
        );
      })}
    </div>
  );
}
