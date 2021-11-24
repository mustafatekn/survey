import React, { useEffect, useState } from "react";
import axios from "axios";
import Survey from "./Survey";
import { useSurveyDispatch } from "../context/survey";
import Categories from "./Categories";
import { Row, Col } from "reactstrap";

export default function Surveys() {
  const [surveyList, setSurveyList] = useState([]);
  const dispatch = useSurveyDispatch();

  const getSurveys = () => {
    axios
      .get("/surveys")
      .then((res) => {
        setSurveyList(res.data);
        dispatch({ type: "SET_SURVEYS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <Row>
      <Col md={3}>
        <Categories />
      </Col>
      <Col md={9}>
        {surveyList.map((survey) => (
          <Survey survey={survey} key={survey.id} />
        ))}
      </Col>
    </Row>
  );
}
