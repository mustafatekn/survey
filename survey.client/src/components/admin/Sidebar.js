import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
export default function AdminSidebar() {
  return (
    <div className="bg-dark p-3" id="sidebar">
      <h5 className="text-white">Sidebar</h5>
      <hr />

      <Nav navbar>
        <NavItem>
          <Link to="/admin/categories" className="nav-link text-white">
            Categories
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/survey" className="nav-link text-white">
            Surveys
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/auth/register" className="nav-link text-white">
            Register
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/auth/login" className="nav-link text-white">
            Login
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/admin" className="nav-link text-white">
            Admin Page
          </Link>
        </NavItem>
      </Nav>
      <hr />
    </div>
  );
}
