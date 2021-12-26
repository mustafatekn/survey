import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useCategoryDispatch } from "../../context/category";
import roleStatement from "../../util/roleStatement";

export default function PostAdminCategory({ categories, setCategories }) {
  const { user } = useAuthState();
  const [category, setCategory] = useState({});
  const dispatch = useCategoryDispatch();

  const submitNewCategory = (e) => {
    e.preventDefault();
    if (roleStatement(user) !== "admin") throw new Error("Unauthorized");
    axios
      .post("/categories", category, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_CATEGORY", payload: res.data });
        setCategories([...categories, res.data]);
        clearInputs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearInputs = () => {
    setCategory({});
    document.getElementById("categoryNameInput").value = "";
  };
  
  return (
    <Form method="POST" onSubmit={submitNewCategory}>
      <h5>Add a category</h5>
      <FormGroup>
        <Label for="categoryNameInput">Category Name</Label>
        <Input
          id="categoryNameInput"
          name="name"
          type="text"
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </FormGroup>
      <Button type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );
}
