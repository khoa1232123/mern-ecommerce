import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const FormModal = ({
  modalTitle,
  show,
  handleClose,
  children,
  onHide,
  buttons,
  size,
  ...props
}) => {
  return (
    <Modal size={size} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {buttons ? (
          buttons.map((btn, index) => (
            <Button key={index} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
