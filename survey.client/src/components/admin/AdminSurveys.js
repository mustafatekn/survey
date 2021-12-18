import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../../context/survey";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PostAdminSurvey from "./PostAdminSurvey";
import AdminSurvey from "./AdminSurvey";

export default function AdminSurveys() {
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
      <PostAdminSurvey setSurveys={setSurveys} surveys={surveys} />
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
            <AdminSurvey key={survey.id} survey={survey} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
