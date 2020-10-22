import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../../redux/actions';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <span className="btn btn-secondary" onClick={logout}>
          Sign Out
        </span>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <NavLink to="/signin" className="btn btn-secondary mr-2">
          Signin
        </NavLink>
        <NavLink to="/signup" className="btn btn-secondary">
          Signup
        </NavLink>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 2 }}
      sticky="top"
    >
      <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
