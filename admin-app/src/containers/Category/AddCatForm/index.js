import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { addCategory } from '../../../redux/actions';

const AddCatForm = ({ show, setShow, createCategoryList }) => {
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [parentCatId, setParentCatId] = useState('');
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

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

  const handleCatImage = (e) => {
    setCatImage(e.target.files[0]);
  };

  return (
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

      <select className="form-control">
        <option value="">Select Type</option>
        <option value="store">store</option>
        <option value="product">product</option>
        <option value="page">page</option>
      </select>

      <input type="file" name="catImage" onChange={handleCatImage} />
    </Modal>
  );
};

export default AddCatForm;
