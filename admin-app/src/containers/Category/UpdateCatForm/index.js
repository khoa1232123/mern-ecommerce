import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { linearCategories } from '../../../helpers/categories';
import { updatedCategories } from '../../../redux/actions';

const UpdateCatForm = ({
  show,
  setShow,
  expandedArray,
  checkedArray,
  setExpandedArray,
  setCheckedArray,
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
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    dispatch(updatedCategories(form));
    setShow(false);
  };

  // const handleCatImage = (e) => {
  //   setCatImage(e.target.files[0]);
  // };

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
    >
      <h2>Expanded</h2>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                name="name"
                placeholder="Category Name"
                label="Category Name"
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'expanded')
                }
              />
            </Col>
            <Col>
              <select
                className="form-control mb-3"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    'parentId',
                    e.target.value,
                    index,
                    'expanded'
                  )
                }
              >
                <option>Select option</option>
                {linearCategories(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control mb-3"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput('type', e.target.value, index, 'expanded')
                }
              >
                <option value="">Select Type</option>
                <option value="store">store</option>
                <option value="product">product</option>
                <option value="page">page</option>
              </select>
            </Col>
          </Row>
        ))}

      <h2>Check</h2>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                name="name"
                placeholder="Category Name"
                label="Category Name"
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'checked')
                }
              />
            </Col>
            <Col>
              <select
                className="form-control mb-3"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    'parentId',
                    e.target.value,
                    index,
                    'checked'
                  )
                }
              >
                <option>Select option</option>
                {linearCategories(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control mb-3"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput('type', e.target.value, index, 'checked')
                }
              >
                <option value="">Select Type</option>
                <option value="store">store</option>
                <option value="product">product</option>
                <option value="page">page</option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateCatForm;
