import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { addCategory, getAllCategory } from '../../redux/actions';

const Category = () => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [parentCatId, setParentCatId] = useState('');
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [getAllCategory]);

  const renderCategories = (categories) => {
    let newCategories = [];
    for (let category of categories) {
      newCategories.push(
        <li key={category._id}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return newCategories;
  };

  const handleClose = () => {
    const form = new FormData();
    form.append('name', catName);
    form.append('parentId', parentCatId);
    form.append('categoryImage', catImage);
    dispatch(addCategory(form));
    setCatImage('');
    setCatName('');
    setParentCatId('');
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCatImage = (e) => {
    setCatImage(e.target.files[0]);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
      <Modal show={show} modalTitle="Add Category" handleClose={handleClose}>
        <Input
          value={catName}
          name="name"
          placeholder="Category Name"
          label="Category Name"
          onChange={(e) => setCatName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCatId}
          onChange={(e) => setParentCatId(e.target.value)}
        >
          <option>Select option</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input type="file" name="catImage" onChange={handleCatImage} />
      </Modal>
    </>
  );
};

export default Category;
