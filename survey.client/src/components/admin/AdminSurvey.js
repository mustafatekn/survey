import React from "react";
import { Button } from "reactstrap";
export default function AdminSurvey({ survey }) {
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
    </tr>
  );
}
