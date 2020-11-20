import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { getProductsByCat } from '../../../redux/actions';
import { generatePublicUrl } from '../../../urlConfig';

const ProductStore = (props) => {
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
    <div className="container-fluid mt-4">
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={<button className="btn btn-primary">view all</button>}
            style={{ marginTop: '15px' }}
          >
            <div className="cardBody">
              {product.productsByPrice[key].map((product, index) => (
                <div key={index} className="productContainer">
                  <div className="productImg">
                    <Link to={`/${product.slug}/${product._id}/p`}>
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </Link>
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
          </Card>
        );
      })}
    </div>
  );
};

export default ProductStore;
