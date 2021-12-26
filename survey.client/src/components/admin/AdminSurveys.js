import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../../context/survey";
import { Table } from "reactstrap";
import PostDiscoverSurvey from "./PostDiscoverSurvey";
import AdminSurvey from "./AdminSurvey";

export default function AdminSurveys() {
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
      <PostDiscoverSurvey
        setSurveys={setSurveys}
        surveys={surveys}
        getSurveys={getSurveys}
      />
      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Question</th>
            <th>Description</th>
            <th>Url</th>
            <th>Image Url</th>
            <th>Created At</th>
            <th>Choices</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <AdminSurvey
              key={survey.id}
              survey={survey}
              getSurveys={getSurveys}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
