import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function NavigationBar() {
  return (
    <Navbar color="light" expand="md" light>
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
}

<Navbar color="transparent">
  <Link to="/" className="nav-link text-danger">
    Navbar
  </Link>

  <NavbarToggler onClick={function noRefCheck() {}} />
  <Collapse navbar>
    <Nav className="ms-auto" navbar>
      <NavItem>
        <NavLink>
          <Link to="/">Home</Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/survey">Surveys</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>;
