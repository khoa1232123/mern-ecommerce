import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const FormModal = ({
  modalTitle,
  show,
  handleClose,
  children,
  size,
  ...props
}) => {
  return (
    <Modal size={size} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;