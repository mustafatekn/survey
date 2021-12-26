import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import { useAuthState } from "../context/auth";
import { useSurveyDispatch } from "../context/survey";

export default function Survey({ survey }) {
  const { user } = useAuthState();
  const userId = user && (user.id || parseInt(user.nameid));

  const [vote, setVote] = useState({
    surveyId: 0,
    choiceId: 0,
    userId: userId,
  });

  const [voteSituation, setVoteSituation] = useState([]);
  const dispatch = useSurveyDispatch();

  const voteSurvey = (e) => {
    // if (isVoted) throw new Error("Already voted");
    if (vote.choiceId !== 0 || vote.surveyId !== 0) {
      axios
        .post("/vote", vote, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          dispatch({ type: "VOTE_A_SURVEY", payload: res.data });
          checkIfVoted();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkIfVoted = () => {
    survey.votes &&
      survey.votes.map((vote) => {
        if (vote.userId === userId) {
          setVoteSituation([
            ...voteSituation,
            { userId, surveyId: vote.surveyId, isVoted: true },
          ]);
        }
      });
  };

  const votedChoiceMarkup = survey.choices.map((choice) => (
    <ListGroupItem
      key={choice.id}
      color="dark"
      className="my-1 rounded border border-1"
    >
      <div className="d-flex">
        <div>
          {survey.votes &&
            survey.votes.filter((i) => i.choiceId === choice.id).length}{" "}
          vote
        </div>
        <div className="d-flex flex-fill justify-content-end">
          %
          {(survey.votes.filter((i) => i.choiceId === choice.id).length * 100) /
            survey.votes.length}
        </div>
      </div>
    </ListGroupItem>
  ));

  const unvotedChoiceMarkup = survey.choices.map((choice) => (
    <ListGroupItem
      key={choice.id}
      className="my-1 rounded border border-1"
      onClick={(e) => {
        setVote({
          ...vote,
          choiceId: choice.id,
          surveyId: survey.id,
        });
        voteSurvey(e);
      }}
    >
      {choice.name}
    </ListGroupItem>
  ));

  useEffect(() => {
    checkIfVoted();
  }, []);

  return (
    <Card className="w-50 my-4 mx-auto">
      {survey.user && (
        <CardHeader className="px-3">{survey.user.username}</CardHeader>
      )}
      <CardBody>
        <CardTitle tag="h5">{survey.question}</CardTitle>
        <CardText>{survey.description}</CardText>

        <ListGroup>
          {voteSituation.find(
            (i) =>
              i.surveyId === survey.id &&
              i.userId === userId &&
              i.isVoted === true
          )
            ? votedChoiceMarkup
            : unvotedChoiceMarkup}
        </ListGroup>
      </CardBody>
      <CardFooter>
        <span className="text-muted">{survey.createdAt}</span>
      </CardFooter>
    </Card>
  );
}
