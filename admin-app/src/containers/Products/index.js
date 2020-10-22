import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import { getAllCategory } from '../../redux/actions';
import { addProduct } from '../../redux/actions/productActions';
import Modal from '../../components/UI/Modal';

const Products = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [getAllCategory]);

  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }
    dispatch(addProduct(form));
    setName('');
    setQuantity(0);
    setPrice(0);
    setDescription('');
    setCategoryId('');
    setProductPictures([]);
    setShow(false);
  };

  console.log(product);

  const handleShow = () => {
    setShow(true);
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

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>test</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
          <Col md={12} className="mt-4">
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      <Modal modalTitle="Add New Product" show={show} handleClose={handleClose}>
        <Input
          value={name}
          placeholder="Product Name"
          label="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          value={quantity}
          placeholder="Quantity"
          label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          type="number"
          value={price}
          placeholder="Price"
          label="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          value={description}
          placeholder="Description"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select option</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{JSON.stringify(pic)}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    </>
  );
};

export default Products;
