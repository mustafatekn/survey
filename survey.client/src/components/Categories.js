import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../context/survey";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function Categories({ getSurveys }) {
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const dispatch = useSurveyDispatch();

  const emptyCategory = {
    id: 0,
    name: null,
  };
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
    getSurveys(category);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ListGroup>
      <ListGroupItem
        active={!currentCategory.id}
        className="categoryList"
        onClick={(e) => {
          setCurrentCategory(emptyCategory);
          changeCategory(emptyCategory);
        }}
      >
        All Surveys
      </ListGroupItem>
      {categoryList.map((category) => (
        <ListGroupItem
          className="categoryList"
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
