import React, { useEffect, useState } from "react";
import { useCategoryDispatch } from "../../context/category";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import AdminCategory from "./AdminCategory";
import { useAuthState } from "../../context/auth";
import roleStatement from "../../util/roleStatement";
import PostAdminCategory from "./PostAdminCategory";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  
  const dispatch = useCategoryDispatch();
  const { user } = useAuthState();

  const getCategories = () => {
    if (roleStatement(user) !== "admin") throw new Error("Unauthorized");
    axios
      .get("/categories")
      .then((res) => {
        dispatch({ type: "SET_CATEGORIES", payload: res.data });
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, [categories]);

  return (
    <div className="p-4">
      <PostAdminCategory categories={categories} setCategories={setCategories}/>

      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <AdminCategory
                category={category}
                key={category.id}
                categories={categories}
                setCategories={setCategories}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
