import React, { useEffect, useState } from "react";
import axios from "axios";
import Survey from "./Survey";
import { useSurveyDispatch } from "../context/survey";
import Categories from "./Categories";
import PostSurvey from "./PostSurvey";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useSurveyDispatch();

  const getAdministrationSurveys = (category) => {
    if (category && category.id !== 0) {
      axios
        .get(`/surveys/administration/category/?categoryId=${category.id}`)
        .then((res) => {
          setSurveys(res.data);
          dispatch({ type: "SET_SURVEYS", payload: res.data });
        });
    } else {
      axios
        .get("/surveys/administration")
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
    getAdministrationSurveys();
  }, []);

  return (
    <div>
      <div className="bg-dark py-2">
        <Categories getAdministrationSurveys={getAdministrationSurveys} />
      </div>
      <PostSurvey />
      {surveys.map((survey) => (
        <Survey survey={survey} key={survey.id} />
      ))}
    </div>
  );
}
