import React, { useEffect } from "react";
import axios from "axios";

const getSurveys = () => {
  axios
    .get("/surveys")
    .then((res) => {
      console.log(res.data);
    })
    .then((err) => {
      console.log(err);
    });
};

useEffect(() => {
  getSurveys();
}, []);
export default function Surveys() {
  return <div></div>;
}
