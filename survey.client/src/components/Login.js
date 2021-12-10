import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { useAuthDispatch } from "../context/auth";

export default function Login() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
      });
      const dispatch = useAuthDispatch();
      
      const login = (userData) => {
        axios
          .post("/auth/login", userData)
          .then((res) => {
            dispatch({type:'LOGIN', payload: res.data})
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const submitLogin = (e) => {
        e.preventDefault();
        login(userData);
    }

  return (
    <Container>
      <Form className="w-50 mx-auto mt-5 px-5" onSubmit={submitLogin} method="POST">
        <FormGroup>
          <Label for="usernameInput">Username</Label>
          <Input
            id="usernameInput"
            name="username"
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input
            id="passwordInput"
            name="password"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </FormGroup>
        <Button type="submit" className="w-100">Submit</Button>
      </Form>
    </Container>
  );
}
