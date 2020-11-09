import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { linearCategories } from '../../helpers/categories';

const Page = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const category = useSelector((state) => state.category);
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   setCategories(linearCategories(category.categories));
  // }, [category]);

  const handleBannerImages = (e) => {
    console.log(e);
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

  const submitPageForm = (e) => {
    e.target.preventDefault();
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
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        onHide={() => setCreateModal(false)}
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
        <Row>
          <Col>
            <Input type="file" name="banners" onChange={handleBannerImages} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="file" name="products" onChange={handleProductImages} />
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <div>
      <button onClick={() => setCreateModal(true)}>Modal</button>
      {renderCreatePageModal()}
    </div>
  );
};

export default Page;
