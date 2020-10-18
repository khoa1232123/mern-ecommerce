import React from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions';

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  });
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Category</h3>
            <Button>Add</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
