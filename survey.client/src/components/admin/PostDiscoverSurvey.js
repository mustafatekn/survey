import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import axios from "axios";
import { useCategoryDispatch } from "../../context/category";
import { useSurveyDispatch } from "../../context/survey";
import ChoiceInput from "../layout/ChoiceInput";
import { useAuthState } from "../../context/auth";
import roleStatement from "../../util/roleStatement";

export default function PostDiscoverSurvey({
  setSurveys,
  surveys,
  getDiscoverSurveys,
}) {
  const { user } = useAuthState();
  const [survey, setSurvey] = useState({
    question: "",
    description: "",
    choiceNames: [],
    categoryid: 0,
    userId: user.id || parseInt(user.nameid),
    imageUrl: "",
  });
  const [choices] = useState([]);
  const [categories, setCategories] = useState([]);
  let [choiceInputQuantity, setChoiceInputQuantity] = useState(0);

  const dispatchCategory = useCategoryDispatch();
  const dispatchSurvey = useSurveyDispatch();

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

  const increaseInputQuantity = () => {
    setChoiceInputQuantity(++choiceInputQuantity);
  };

  const setChoices = () => {
    const choiceInputs = document.getElementsByName("choice");
    choiceInputs.forEach((choiceInput) => {
      choices.push(choiceInput.value);
    });
  };

  const postSurvey = (e) => {
    if (roleStatement(user) !== "admin") throw new Error("Unauthorized");
    e.preventDefault();
    setChoices();
    survey.choiceNames = choices;
    axios
      .post("/surveys", survey, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatchSurvey({ type: "CREATE_DISCOVER_SURVEY", payload: res.data });
        setSurveys([...surveys, res.data]);
        getDiscoverSurveys();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Form className=" p-4 mx-auto" onSubmit={(e) => postSurvey(e)}>
      <h5>Post a survey!</h5>

      <FormGroup>
        <Label for="questionInput">Question</Label>
        <Input
          id="questionInput"
          name="question"
          type="text"
          onChange={(e) => setSurvey({ ...survey, question: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <Label for="descriptionInput">Description</Label>
        <Input
          id="descriptionInput"
          name="description"
          type="text"
          onChange={(e) =>
            setSurvey({ ...survey, description: e.target.value })
          }
        />
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

      <Button type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );
}
