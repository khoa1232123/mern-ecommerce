import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { getProductsByCat } from '../../../redux/actions';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const ClothingAndAccessories = ({ ...props }) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const {
      match: {
        params: { slug },
      },
    } = props;
    dispatch(getProductsByCat(slug));
  }, [dispatch, props]);
  return (
    <div className="container-fluid mt-3">
      <Card
        style={{
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex',
        }}
      >
        {product.products.map((product, index) => (
          <div className="caContainer" key={index}>
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img
                src={generatePublicUrl(product.productPictures[0].img)}
                alt="product"
              />
            </Link>
            <div>
              <div className="caProductName">
                <Link
                  className="caImgContainer"
                  to={`/${product.slug}/${product._id}/p`}
                >
                  {product.name}
                </Link>
              </div>
              <div className="caProductPrice">{product.price}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
