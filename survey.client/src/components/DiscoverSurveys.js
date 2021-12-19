import React, { useEffect, useState } from "react";
import axios from "axios";
import DiscoverSurvey from "./DiscoverSurvey";
import { useSurveyDispatch } from "../context/survey";
import Categories from "./Categories";

export default function Surveys() {
  const [discoverSurveys, setDiscoverSurveys] = useState([]);
  const dispatch = useSurveyDispatch();

  const getDiscoverSurveys = (category) => {
    if (category && category.id !== 0) {
      axios
        .get(`/surveys/discover/category/?categoryId=${category.id}`)
        .then((res) => {
          setDiscoverSurveys(res.data);
          dispatch({ type: "SET_DISCOVER_SURVEYS", payload: res.data });
        });
    } else {
      axios
        .get("/surveys/discover")
        .then((res) => {
          setDiscoverSurveys(res.data);
          dispatch({ type: "SET_DISCOVER_SURVEYS", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDiscoverSurveys();
  }, []);

  return (
    <div>
      <div className="bg-dark py-2">
        <Categories getDiscoverSurveys={getDiscoverSurveys} />
      </div>
      {discoverSurveys.map((discoverSurvey) => (
        <DiscoverSurvey
          discoverSurvey={discoverSurvey}
          key={discoverSurvey.id}
        />
      ))}
    </div>
  );
}
