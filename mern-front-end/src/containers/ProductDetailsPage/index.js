import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../redux/actions';

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    const { productId } = props.match.params;
    dispatch(getProductDetailsById({ productId }));
  }, [dispatch]);
  console.log(props);
  return (
    <div>
      <p>{JSON.stringify(product)}</p>
    </div>
  );
};

export default ProductDetailsPage;
