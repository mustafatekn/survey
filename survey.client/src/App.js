import React from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/home";
import Survey from "./pages/survey";
import Register from "./pages/register";
import Login from "./pages/login";
import { SurveyProvider } from "./context/survey";
import { AuthProvider } from "./context/auth";

function App() {
  axios.defaults.baseURL = "https://localhost:5001";
  return (
    <AuthProvider>
      <SurveyProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </SurveyProvider>
    </AuthProvider>
  );
}

export default App;
