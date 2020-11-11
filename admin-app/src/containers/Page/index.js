import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPageForm from './AddPageForm';

const Page = () => {
  const [createModal, setCreateModal] = useState(false);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Page</h3>
            <Col className="text-right">
              <Button onClick={() => setCreateModal(true)} className="mr-2">
                Add
              </Button>
            </Col>
          </div>
        </Col>
        <AddPageForm show={createModal} setShow={setCreateModal} />
      </Row>
    </Container>
  );
};

export default Page;
