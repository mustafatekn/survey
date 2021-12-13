import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

import { SurveyProvider } from "./context/survey";
import { AuthProvider } from "./context/auth";
import { CategoryProvider } from "./context/category";
import { Container } from "reactstrap";
import Router from "./util/Router";


function App() {
  axios.defaults.baseURL = "https://localhost:5001";
  return (
    <AuthProvider>
      <SurveyProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Container fluid className="p-0">
            <NavigationBar />
            <Router/>
            </Container>
          </BrowserRouter>
        </CategoryProvider>
      </SurveyProvider>
    </AuthProvider>
  );
}

export default App;
