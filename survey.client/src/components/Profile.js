import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useUserDispatch } from "../context/user";
import Survey from "./Survey";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  let dispatch = useUserDispatch();
  const getUserDetails = () => {
    axios
      .get(`/auth/?username=${username}`)
      .then((res) => {
        setUser(res.data);
        dispatch({ type: "SET_USER", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container>
      <Row className="py-5">
        <Col md={3} className="text-end">
          <img
            src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
            style={{ width: "150px", height: "150px" }}
            className="rounded-circle"
          />
        </Col>
        <Col md={9}>
          <h1 className="h3">{user.username}</h1>
          <h1 className="h3">{user.email}</h1>
          <h1 className="h3">{user.createdAt}</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          {user.surveys &&
            user.surveys.map((survey) => <Survey key={survey.id} survey={survey}/>)}
        </Col>
      </Row>
    </Container>
  );
}
