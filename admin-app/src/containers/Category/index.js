import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddCatForm from './AddCatForm';
import UpdateCatForm from './UpdateCatForm';
import CheckboxTree from 'react-checkbox-tree';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosFolder,
  IoIosDocument,
  IoIosFolderOpen,
  IoMdSquareOutline,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import DeleteCatForm from './DeleteCatForm';
import { linearCategories } from '../../helpers/categories';

const Category = () => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  // const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let newCategories = [];
    for (let category of categories) {
      newCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return newCategories;
  };

  const handleShow = () => {
    setShow(true);
  };

  const updateCheckedAndExpandedCat = () => {
    setCheckedArray([]);
    setExpandedArray([]);
    const checkedArray2 = [];
    const expandedArray2 = [];
    const categories = linearCategories(category.categories);
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray2.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray2.push(category);
      });
    setCheckedArray(checkedArray2);
    setExpandedArray(expandedArray2);
    console.log({
      categories,
    });
  };

  const openUpdateCategoryForm = () => {
    updateCheckedAndExpandedCat();
    setUpdateCategoryModal(true);
  };

  const openDeleteCategoryForm = () => {
    updateCheckedAndExpandedCat();
    setDeleteCategoryModal(true);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <Col className="text-right">
                <Button onClick={handleShow} className="mr-2">
                  Add
                </Button>
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={openDeleteCategoryForm}
                >
                  Delete
                </Button>
                <Button variant="warning" onClick={openUpdateCategoryForm}>
                  Edit
                </Button>
              </Col>
            </div>
          </Col>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoMdSquareOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
                expandAll: <IoIosArrowForward />,
                collapseAll: <IoIosArrowForward />,
                parentClose: <IoIosFolder />,
                parentOpen: <IoIosFolderOpen />,
                leaf: <IoIosDocument />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <AddCatForm show={show} setShow={setShow} />
      <UpdateCatForm
        show={updateCategoryModal}
        setShow={setUpdateCategoryModal}
        updateCategory={openUpdateCategoryForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        setCheckedArray={setCheckedArray}
        setExpandedArray={setExpandedArray}
      />
      <DeleteCatForm
        show={deleteCategoryModal}
        setShow={setDeleteCategoryModal}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </>
  );
};

export default Category;
