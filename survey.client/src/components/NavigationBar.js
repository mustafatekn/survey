import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import { useAuthState } from "../context/auth";

export default function NavigationBar() {
  const { user } = useAuthState();

  const unAuthenticatedNavbarMarkup = (
    <Navbar color="light" expand="md" light fixed="top">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Surveys
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
    <Navbar color="light" expand="md" light fixed="top">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Surveys
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  const adminNavbar = (
    <Navbar color="light" expand="md" light fixed="top">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/survey" className="nav-link">
              Surveys
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin" className="nav-link">
              Admin Page
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
  if(!user){
    return unAuthenticatedNavbarMarkup;
  }else{
    if(user.role === 2 || user.role === 3){
      return adminNavbar;
    }else{
      return authenticatedNavbarMarkup;
    }
  }
}
