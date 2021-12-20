import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../context/survey";
import Survey from "./Survey";
import PostSurvey from "./PostSurvey";
export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useSurveyDispatch();
  const getSurveys = () => {
    axios
      .get("/surveys")
      .then((res) => {
        dispatch({ type: "SET_MEMBER_SURVEYS", payload: res.data });
        setSurveys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSurveys();
  }, []);
  return (
    <div>
      <PostSurvey
        surveys={surveys}
        setSurveys={setSurveys}
        getSurveys={getSurveys}
      />
      {surveys.map((survey) => (
        <Survey survey={survey} />
      ))}
    </div>
  );
}
