import React, { useEffect } from 'react';
import { getProductPage } from '../../../redux/actions';
import getParams from '../../../utils/getParams';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '../../../components/UI/Card';

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    console.log(params);
    dispatch(getProductPage(params));
  }, [dispatch, props.location.search]);

  return (
    <div className="productPage container-fluid">
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <div key={`banner-${index}`}>
              <img src={banner.img} alt="banner" />
            </div>
          ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {page.products &&
          page.products.map((product, index) => (
            <Card key={`product-${index}`}>
              <img src={product.img} alt="product" />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
