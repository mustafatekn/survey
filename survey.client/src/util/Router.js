import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthState } from "../context/auth";
import Home from "../pages/home";
import Survey from "../pages/survey";
import Register from "../pages/register";
import Login from "../pages/login";
import Admin from "../pages/admin";
import AdminCategories from "../pages/adminCategories";

export default function Router() {
    const {user} = useAuthState();
  return (
    <Routes>
      <Route path="/auth/login" element={user ? <Navigate to="/"/> : <Login/>} />
      <Route path="/auth/register" element={user ? <Navigate to="/"/> : <Register />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/admin" element={user && (user.role===2 || user.role===3) ? <Admin /> : <Navigate to="/"/>} />   
      <Route path="/admin/categories" element={user && (user.role===2 || user.role===3) ? <AdminCategories /> : <Navigate to="/"/>} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}
