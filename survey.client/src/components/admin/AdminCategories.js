import React, { useEffect, useState } from "react";
import { useCategoryDispatch } from "../../context/category";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import AdminCategory from "./AdminCategory";
import { useAuthState } from "../../context/auth";
import roleStatement from "../../util/roleStatement";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const dispatch = useCategoryDispatch();
  const { user } = useAuthState();
  const getCategories = () => {
    if (roleStatement(user) !== "admin") {
      throw new Error("Unauthorized");
    } else {
      axios
        .get("/categories")
        .then((res) => {
          dispatch({ type: "SET_CATEGORIES", payload: res.data });
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewCategory = (category) => {
    if (roleStatement(user) !== "admin") {
      throw new Error("Unauthorized");
    } else {
      axios
        .post("/categories", category, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "ADD_CATEGORY", payload: res.data });
          getCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitNewCategory = (e) => {
    e.preventDefault();
    addNewCategory(newCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-5 p-4">
      <Form
        method="POST"
        onSubmit={submitNewCategory}
        className="border border-3 p-4 rounded"
      >
        <h5>Add a category</h5>
        <FormGroup>
          <Label for="categoryNameInput">Category Name</Label>
          <Input
            id="categoryNameInput"
            name="name"
            type="text"
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
        </FormGroup>
        <Button type="submit" className="w-100">
          Submit
        </Button>
      </Form>

      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <AdminCategory
                category={category}
                key={category.id}
                getCategories={getCategories}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
