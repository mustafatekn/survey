import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../context/survey";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function Categories({ getSurveys }) {
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const dispatch = useSurveyDispatch();

  const getCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        setCategoryList(res.data);
        dispatch({ type: "SET_CATEGORIES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCategory = (category) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: category });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ListGroup>
      {categoryList.map((category) => (
        <ListGroupItem
          id="categoryList"
          key={category.id}
          active={category.id === currentCategory.id}
          onClick={(e) => {
            setCurrentCategory(category);
            changeCategory(category);
          }}
        >
          {category.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
