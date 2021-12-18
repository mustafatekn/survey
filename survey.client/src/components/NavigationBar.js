import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../context/auth";
import roleStatement from "../util/roleStatement";

export default function NavigationBar() {
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  let navigate = useNavigate();
  const logout = (e) => {
    if (roleStatement(user) !== "unAuthenticated") {
      authDispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  const unAuthenticatedNavbarMarkup = (
    <Navbar color="light" expand="md" light fixed="top" id="navbar">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Discover
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/auth/register" className="nav-link">
              Register
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/auth/login" className="nav-link">
              Login
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  const authenticatedNavbarMarkup = (
    <Navbar color="light" expand="md" light fixed="top" id="navbar">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Discover
            </Link>
          </NavItem>
          <NavItem>
            <Link to="" className="nav-link" size="sm" onClick={() => logout()}>
              Logout
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  const adminNavbarMarkup = (
    <Navbar color="light" expand="md" light fixed="top" id="navbar">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Discover
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin" className="nav-link">
              Admin Page
            </Link>
          </NavItem>
          <NavItem>
          <Link to="" className="nav-link" onClick={() => logout()}>
              Logout
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  const roleState = roleStatement(user);
  if (roleState === "unAuthenticated") {
    return unAuthenticatedNavbarMarkup;
  } else if (roleState === "authenticated") {
    return authenticatedNavbarMarkup;
  } else if (roleState === "admin") {
    return adminNavbarMarkup;
  }
}
