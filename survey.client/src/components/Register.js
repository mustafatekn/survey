import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  let navigate = useNavigate();
  const register = (newUser) => {
    axios
      .post("/auth/register", newUser)
      .then((res) => {
        navigate("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    register(newUser);
  };

  return (
    <Container>
      <Form
        className="w-50 mx-auto mt-5 px-5"
        onSubmit={submitRegister}
        method="POST"
      >
        <FormGroup>
          <Label for="usernameInput">Username</Label>
          <Input
            id="usernameInput"
            name="username"
            type="text"
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="emailInput">Email</Label>
          <Input
            id="emailInput"
            name="email"
            type="email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input
            id="passwordInput"
            name="password"
            type="password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPasswordInput">Confirm Password</Label>
          <Input
            id="confirmPasswordInput"
            name="confirmPassword"
            type="password"
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
          />
        </FormGroup>
        <Button type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
