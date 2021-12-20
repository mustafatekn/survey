import classNames from "classnames";
import React, { useEffect, useState } from "react";
import axios from "axios";
import roleStatement from "../util/roleStatement";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import { useAuthState } from "../context/auth";
import { useSurveyDispatch, useSurveyState } from "../context/survey";
import { useCategoryDispatch } from "../context/category";
import ChoiceInput from "./layout/ChoiceInput";

export default function PostSurvey({ surveys, getSurveys, setSurveys }) {
  const { user } = useAuthState();
  const [survey, setSurvey] = useState({
    question: "",
    description: "",
    choiceNames: [],
    imageUrl: "",
    userId: user.id || parseInt(user.nameid),
  });
  const [categories, setCategories] = useState([]);
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);
  const [choices] = useState([]);
  let [choiceInputQuantity, setChoiceInputQuantity] = useState(0);

  const dispatchCategory = useCategoryDispatch();
  const dispatchSurvey = useSurveyDispatch();
  const toggleDescriptionVisibility = () => {
    if (descriptionVisibility === false) {
      setDescriptionVisibility(true);
    } else {
      setDescriptionVisibility(false);
    }
  };

  const increaseInputQuantity = () => {
    setChoiceInputQuantity(++choiceInputQuantity);
  };

  const getCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
        dispatchCategory({ type: "SET_CATEGORIES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setChoices = () => {
    const choiceInputs = document.getElementsByName("choice");
    choiceInputs.forEach((choiceInput) => {
      choices.push(choiceInput.value);
    });
  };

  const postSurvey = (e) => {
    if (roleStatement(user) === "unauthenticated")
      throw new Error("Unauthorized");
    e.preventDefault();
    setChoices();
    survey.choiceNames = choices;
    console.log(survey);
    axios
      .post("/surveys", survey, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatchSurvey({ type: "CREATE_MEMBER_SURVEY", payload: res.data });
        setSurveys([...surveys, res.data]);
        getSurveys();
        console.log(survey);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  });
  return (
    <Form className="border border-1 p-4 rounded-3 mt-5 w-50 mx-auto">
      <Row>
        <Col md={4}>
          <h5>Post a survey!</h5>
        </Col>
        <Col md={8}>
          <Button
            type="button"
            id="descriptionVisibilityButton"
            size="sm"
            className={classNames(
              "d-block ms-auto mb-3 ",
              descriptionVisibility ? "bg-danger" : "bg-black"
            )}
            onClick={toggleDescriptionVisibility}
          >
            {descriptionVisibility
              ? "Remove Description"
              : "Write a description"}
          </Button>
        </Col>
      </Row>

      <FormGroup>
        <Label for="questionInput">Question</Label>
        <Input
          id="questionInput"
          name="question"
          type="text"
          onChange={(e) => setSurvey({ ...survey, question: e.target.value })}
        />
      </FormGroup>

      <FormGroup
        className={classNames(descriptionVisibility ? "d-block" : "d-none")}
      >
        <Label for="descriptionInput">Description</Label>
        <Input id="descriptionInput" name="description" type="text" />
      </FormGroup>

      <FormGroup>
        <Label for="categoryInput">Category</Label>
        <Input
          className="mb-3"
          type="select"
          defaultValue={"Choose a category"}
          onChange={(e) => setSurvey({ ...survey, categoryid: e.target.value })}
        >
          <option disabled>Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="imageUrlInput">Image Url</Label>
        <Input
          id="imageUrlInput"
          name="imageUrl"
          type="text"
          onChange={(e) => setSurvey({ ...survey, imageUrl: e.target.value })}
        />
      </FormGroup>

      <FormGroup id="choiceFormGroup">
        <Row className="mb-3">
          <Col md={2}>
            <Label for="choiceInput">Choices</Label>
          </Col>
          <Col md={10}>
            <Button
              type="button"
              className="d-block ms-auto"
              id="addChoiceButton"
              onClick={increaseInputQuantity}
            >
              +
            </Button>
          </Col>
        </Row>
        <Input type="text" name="choice" className="mb-2" />
        <Input type="text" name="choice" className="mb-2" />
        <ChoiceInput quantity={choiceInputQuantity} />
      </FormGroup>

      <Button type="button" className="w-100" onClick={(e) => postSurvey(e)}>
        Submit
      </Button>
    </Form>
  );
}
