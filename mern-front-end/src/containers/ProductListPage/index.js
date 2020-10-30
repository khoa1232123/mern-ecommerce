import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCat } from '../../redux/actions';
import { generatePublicUrl } from '../../urlConfig';

const ProductListPage = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.match.params.slug);
    dispatch(getProductsByCat(props.match.params.slug));
  }, [dispatch, props]);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>
                {props.match.params.slug} mobile under {priceRange[key]}
              </div>
              <button>view all</button>
            </div>
            <div className="cardBody">
              {product.productsByPrice[key].map((product) => (
                <div className="productContainer">
                  <div className="productImg">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productContent">
                    <div className="title">{product.name}</div>
                    <div className="feature">
                      <span className="star">4.3</span>
                      <span className="comment">3,400</span>
                    </div>
                    <div className="price">
                      <span>{product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductListPage;
