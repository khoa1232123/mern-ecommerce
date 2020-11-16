import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../../redux/actions';

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const renderCategories = (categories) => {
    let newCategories = [];
    for (let category of categories) {
      newCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <Link
              to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </Link>
          ) : (
            <Link
              to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </Link>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return newCategories;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
