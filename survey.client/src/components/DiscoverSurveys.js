import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../context/survey";
import Categories from "./Categories";
import Survey from "./Survey";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useSurveyDispatch();

  const getSurveys = (category) => {
    if (category && category.id !== 0) {
      axios
        .get(`/surveys/discover/category/?categoryId=${category.id}`)
        .then((res) => {
          setSurveys(res.data);
          dispatch({ type: "SET_DISCOVER_SURVEYS", payload: res.data });
        });
    } else {
      axios
        .get("/surveys/discover")
        .then((res) => {
          setSurveys(res.data);
          dispatch({ type: "SET_DISCOVER_SURVEYS", payload: res.data });
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
    <div>
      <div className="bg-dark py-2">
        <Categories
          getSurveys={getSurveys}
          surveys={surveys}
        />
      </div>
      {surveys.map((survey) => (
        <Survey survey={survey} key={survey.id} />
      ))}
    </div>
  );
}
