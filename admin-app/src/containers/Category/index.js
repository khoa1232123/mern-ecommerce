import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories } from '../../redux/actions';
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

const Category = () => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

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

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleShow = () => {
    setShow(true);
  };

  const updateCheckedAndExpandedCat = () => {
    setCheckedArray([]);
    setExpandedArray([]);
    const checkedArray2 = [];
    const expandedArray2 = [];
    const categories = createCategoryList(category.categories);
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
      checked,
      expanded,
      categories,
      expandedArray2,
      checkedArray2,
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

  const handleDeleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item) => ({ _id: item.value }));
    // const expandedIdsArray = expandedArray.map((item) => ({ _id: item.value }));
    // const idsArray = expandedIdsArray.concat(checkedIdsArray);
    setDeleteCategoryModal(false);
    dispatch(deleteCategories(checkedIdsArray)).then((result) => {
      if (result) {
      }
    });
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
        <Row>
          <Col>
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
        </Row>
      </Container>
      <AddCatForm
        show={show}
        setShow={setShow}
        addCategory={addCategory}
        createCategoryList={createCategoryList}
      />
      <UpdateCatForm
        show={updateCategoryModal}
        setShow={setUpdateCategoryModal}
        updateCategory={openUpdateCategoryForm}
        createCategoryList={createCategoryList}
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
        buttons={[
          {
            label: 'No',
            color: 'danger',
            onClick: () => {
              alert('yes');
            },
          },
          {
            label: 'Yes',
            color: 'primary',
            onClick: handleDeleteCategories,
          },
        ]}
      />
    </>
  );
};

export default Category;
