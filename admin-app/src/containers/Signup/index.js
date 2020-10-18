import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input';
import { signup } from '../../redux/actions';

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const addUser = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(addUser));
  };

  if (auth.authenticate) {
    return <Redirect to={'/'} />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={userSignup}>
            <Row>
              <Col md={{ span: 6 }}>
                <Input
                  type="text"
                  label="First Name"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
              <Col md={{ span: 6 }}>
                <Input
                  type="text"
                  label="Last Name"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Row>
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

export default Signup;
