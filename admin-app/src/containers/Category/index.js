import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { addCategory, getAllCategory } from '../../redux/actions';
import AddCatForm from './AddCatForm';

const Category = () => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [conCat, setConCat] = useState({
    name: '',
    parentCatId: '',
    catImage: '',
  });
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
    form.append('name', conCat.name);
    form.append('parentId', conCat.parentCatId);
    form.append('categoryImage', conCat.catImage);
    dispatch(addCategory(form));
    console.log(conCat);
    setConCat({
      name: '',
      parentCatId: '',
      catImage: '',
    });
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
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
      <AddCatForm
        show={show}
        setConCat={setConCat}
        categories={category.categories}
        handleClose={handleClose}
      />
    </>
  );
};

export default Category;
