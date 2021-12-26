import React from "react";
import { Button } from "reactstrap";
import axios from "axios";
import roleStatement from "../../util/roleStatement";
import { useAuthState } from "../../context/auth";
import { useSurveyDispatch } from "../../context/survey";

export default function AdminSurvey({ survey, getSurveys }) {
  const { user } = useAuthState();
  const dispatch = useSurveyDispatch();

  const removeDiscoverSurvey = (id) => {
    if (roleStatement(user) !== "admin") throw new Error("Unauthorized");

    axios
      .delete(`/surveys/?id=${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "REMOVE_DISCOVER_SURVEY", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{survey.id}</td>
      <td>{survey.category.name}</td>
      <td>{survey.question}</td>
      <td>{survey.description}</td>
      <td>{survey.url}</td>
      <td>{survey.imageUrl}</td>
      <td>{survey.createdAt}</td>
      <td>
        {survey.choices.map((choice) => (
          <Button key={choice.id} size="sm mx-1">
            {choice.name}
          </Button>
        ))}
      </td>

      <td>
        <Button
          size="sm"
          color="danger"
          type="button"
          onClick={() => removeDiscoverSurvey(survey.id)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}
