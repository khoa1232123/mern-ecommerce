import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { linearCategories } from '../../../helpers/categories';
import { createPage } from '../../../redux/actions';

const AddPageForm = ({ show, setShow }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.length !== 0) {
      setCategories(linearCategories(category.categories));
    }
    console.log(categories);
  }, [category]);

  const handleBannerImages = (e) => {
    console.log(banners);
    setBanners([...banners, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    console.log(linearCategories(category.categories));
    console.log(e.target.value);
    const cat = linearCategories(category.categories).find(
      (cate) => cate.value === e.target.value
    );
    console.log(cat);
    setCategoryId(e.target.value);
    setType(cat.type);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = () => {
    if (title === '') {
      alert('Title is required');
      return;
    }
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });
    console.log({ title, description, categoryId, type, banners, products });
    dispatch(createPage(form));
    setTitle('');
    setDescription('');
    setCategoryId('');
    setType('');
    setBanners([]);
    setProducts([]);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      modalTitle={'Create New Page'}
      onHide={() => setShow(false)}
      handleClose={submitPageForm}
    >
      <Row>
        <Col>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'title'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={'Description'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <select
            className="form-control mb-3"
            value={categoryId}
            onChange={onCategoryChange}
          >
            <option>Select option</option>
            {linearCategories(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      {banners.length > 0
        ? banners.map((banner, index) => (
            <Row key={`banner-${index}`}>
              <Col>{banner.name}</Col>
            </Row>
          ))
        : null}
      <Row>
        <Col>
          <Input
            type="file"
            name="banners"
            className="form-control mb-3"
            onChange={handleBannerImages}
          />
        </Col>
      </Row>
      {products.length > 0
        ? products.map((product, index) => (
            <Row key={index}>
              <Col>{product.name}</Col>
            </Row>
          ))
        : null}
      <Row>
        <Col>
          <Input
            type="file"
            name="products"
            className="form-control mb-3"
            onChange={handleProductImages}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddPageForm;
