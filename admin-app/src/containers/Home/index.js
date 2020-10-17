import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          Sidebar
        </Col>
        <Col md={10} className="main-content">
          <Jumbotron className="mt-3 text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
