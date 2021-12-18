import React from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useCategoryDispatch } from "../../context/category";

export default function AdminCategory({ category, getCategories }) {
  const { user } = useAuthState();
  const dispatch = useCategoryDispatch();
  const deleteCategory = (id) => {
    if (user) {
      axios
        .delete(`/categories/?id=${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          dispatch({ type: "REMOVE_CATEGORY", payload: res.data.id });
          getCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
