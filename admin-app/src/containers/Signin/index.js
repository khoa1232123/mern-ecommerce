import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Input from '../../components/UI/Input';

const Signin = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="text-center">Sign In</h1>
          <Form>
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              onChange={() => {}}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              onChange={() => {}}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
