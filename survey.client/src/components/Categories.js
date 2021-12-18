import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSurveyDispatch } from "../context/survey";
import { ListGroup, ListGroupItem } from "reactstrap";
import classnames from "classnames";

export default function Categories({ getAdministrationSurveys }) {
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
    getAdministrationSurveys(category);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ListGroup horizontal className="justify-content-center">
      <ListGroupItem
        className={classnames(
          !currentCategory.id
            ? "categoryList bg-white rounded text-black"
            : "categoryList bg-transparent text-white rounded"
        )}
        onClick={(e) => {
          setCurrentCategory(emptyCategory);
          changeCategory(emptyCategory);
        }}
      >
        All Surveys
      </ListGroupItem>
      {categoryList.map((category) => (
        <ListGroupItem
          className={classnames(
            category.id === currentCategory.id
              ? "categoryList bg-white rounded text-black"
              : "categoryList bg-transparent rounded text-white"
          )}
          key={category.id}
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
