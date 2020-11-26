import React from 'react';
import getParams from '../../utils/getParams';
import ClothingAndAccessories from './ClothingAndAccessories';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    console.log(params);
    switch (params.type) {
      case 'store':
        return <ProductStore {...props} />;
      case 'page':
        return <ProductPage {...props} />;
      default:
        return <ClothingAndAccessories {...props} />;
    }
  };

  return <>{renderProduct()}</>;
};

export default ProductListPage;
