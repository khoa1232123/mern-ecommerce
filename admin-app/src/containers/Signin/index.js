import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="text-center">Sign In</h1>
          <Form onSubmit={userLogin}>
            <Input
              type="email"
              label="Email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
