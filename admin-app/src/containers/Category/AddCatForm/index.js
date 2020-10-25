import React, { useState, useEffect } from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

const AddCatForm = ({ show, handleClose, setConCat, categories }) => {
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [parentCatId, setParentCatId] = useState('');
  useEffect(() => {
    setConCat({
      name: catName,
      parentCatId: catImage,
      catImage: parentCatId,
    });
  }, [catName, catImage, parentCatId]);

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
        {createCategoryList(categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <input type="file" name="catImage" onChange={handleCatImage} />
    </Modal>
  );
};

export default AddCatForm;
