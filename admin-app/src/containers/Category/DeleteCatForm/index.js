import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/Modal';
import { deleteCategories } from '../../../redux/actions';

const DeleteCatForm = ({ show, setShow, expandedArray, checkedArray }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item) => ({ _id: item.value }));
    dispatch(deleteCategories(checkedIdsArray));
    setShow(false);
  };

  return (
    <Modal
      show={show}
      modalTitle="Update Category"
      size="lg"
      onHide={() => setShow(false)}
      handleClose={handleClose}
      buttons={[
        {
          label: 'No',
          color: 'danger',
          onClick: () => setShow(false),
        },
        {
          label: 'Yes',
          color: 'primary',
          onClick: handleDeleteCategories,
        },
      ]}
    >
      <h2>Expanded</h2>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>{item.name}</Col>
          </Row>
        ))}

      <h2>Checked</h2>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>{item.name}</Col>
          </Row>
        ))}
    </Modal>
  );
};

export default DeleteCatForm;
