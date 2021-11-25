import React, { useEffect, useState } from "react";
import axios from "axios";
import Survey from "./Survey";
import { useSurveyDispatch } from "../context/survey";
import Categories from "./Categories";
import { Row, Col } from "reactstrap";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useSurveyDispatch();

  const getSurveys = (category) => {
    if (category && category.id !== 0) {
      axios.get(`/surveys/category/?categoryId=${category.id}`).then((res) => {
        setSurveys(res.data);
        dispatch({ type: "SET_SURVEYS", payload: res.data });
      });
    } else {
      axios
        .get("/surveys")
        .then((res) => {
          setSurveys(res.data);
          dispatch({ type: "SET_SURVEYS", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <Row>
      <Col md={3}>
        <Categories getSurveys={getSurveys} />
      </Col>
      <Col md={9}>
        {surveys.map((survey) => (
          <Survey survey={survey} key={survey.id} />
        ))}
      </Col>
    </Row>
  );
}
