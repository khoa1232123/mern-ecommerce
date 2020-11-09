import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/page'}>Page</NavLink>
            </li>
            <li>
              <NavLink to={'/category'}>Category</NavLink>
            </li>
            <li>
              <NavLink to={'/products'}>Products</NavLink>
            </li>
            <li>
              <NavLink to={'/orders'}>Orders</NavLink>
            </li>
          </ul>
        </Col>
        <Col md={10} className="main-content mt-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
