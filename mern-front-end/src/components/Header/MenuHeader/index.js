import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/actions';

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  });

  console.log(category);

  const renderCategories = (categories) => {
    let newCategories = [];
    for (let category of categories) {
      newCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
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
