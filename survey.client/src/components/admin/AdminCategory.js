import React from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useCategoryDispatch } from "../../context/category";
import roleStatement from "../../util/roleStatement";

export default function AdminCategory({ category, categories, setCategories }) {
  const { user } = useAuthState();
  const dispatch = useCategoryDispatch();
  const deleteCategory = (id) => {
    if (roleStatement(user) !== "admin") throw new Error("Unauthorized");
    axios
      .delete(`/categories/?id=${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "REMOVE_CATEGORY", payload: res.data.id });
        setCategories([...categories.filter((category) => category.id !== id)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>
        <Button
          type="button"
          onClick={() => deleteCategory(category.id)}
          color="danger"
          size="sm"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
