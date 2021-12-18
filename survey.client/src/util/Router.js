import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthState } from "../context/auth";
import Home from "../pages/home";
import Discover from "../pages/discover";
import Register from "../pages/register";
import Login from "../pages/login";
import Profile from '../pages/profile';
import Admin from "../pages/admin/admin";
import AdminSurveys from "../pages/admin/adminSurveys";
import AdminCategories from "../pages/admin/adminCategories";
import roleStatement from "./roleStatement";

export default function Router() {
    const {user} = useAuthState();
  return (
    <Routes>
      <Route path="/auth/login" element={roleStatement(user)==='unAuthenticated' ? <Login/> : <Navigate to="/"/>} />
      <Route path="/auth/register" element={roleStatement(user)==='unAuthenticated' ? <Register /> : <Navigate to="/"/>} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={roleStatement(user)==='admin' ? <Admin /> : <Navigate to="/"/>} />   
      <Route path="/admin/categories" element={roleStatement(user)==='admin' ? <AdminCategories /> : <Navigate to="/"/>} />
      <Route path="/admin/surveys" element={roleStatement(user)==='admin' ? <AdminSurveys /> : <Navigate to="/"/>} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}
