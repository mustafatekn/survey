import React from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/home";
import Survey from "./pages/survey";
import Register from "./pages/register";
import Login from "./pages/login";
import Admin from "./pages/admin";
import AdminCategories from "./pages/adminCategories";
import { SurveyProvider } from "./context/survey";
import { AuthProvider } from "./context/auth";
import { CategoryProvider } from "./context/category";
import { Container } from "reactstrap";

function App() {
  axios.defaults.baseURL = "https://localhost:5001";
  return (
    <AuthProvider>
      <SurveyProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Container fluid>
            <NavigationBar />
            <Routes>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
            </Container>
          </BrowserRouter>
        </CategoryProvider>
      </SurveyProvider>
    </AuthProvider>
  );
}

export default App;
