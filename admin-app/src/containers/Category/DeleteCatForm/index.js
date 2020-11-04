import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/Modal';
import { updatedCategories } from '../../../redux/actions';

const DeleteCatForm = ({
  show,
  setShow,
  // createCategoryList,
  expandedArray,
  checkedArray,
  setExpandedArray,
  setCheckedArray,
  buttons,
}) => {
  // const [catName, setCatName] = useState('');
  // const [catImage, setCatImage] = useState('');
  // const [parentCatId, setParentCatId] = useState('');
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
    });
    dispatch(updatedCategories(form));
    setShow(false);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  return (
    <Modal
      show={show}
      modalTitle="Update Category"
      size="lg"
      onHide={() => setShow(false)}
      handleClose={handleClose}
      buttons={buttons}
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
