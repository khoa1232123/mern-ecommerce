import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import { getCartItems } from '../../redux/actions';

const PriceDetails = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const totalItems = Object.keys(cart.cartItems).reduce((qty, key) => {
    return qty + cart.cartItems[key].qty;
  }, 0);
  const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
    const { price, qty } = cart.cartItems[key];
    return totalPrice + price * qty;
  }, 0);

  return (
    <Card headerLeft="Price Details" style={{ maxWidth: '380px' }}>
      <div style={{ padding: '20px', boxSizing: 'border-box' }}>
        <div className="flexRow sb mt-3">
          <div>Price ({totalItems} items)</div>
          <div>{totalPrice}</div>
        </div>
        <div className="flexRow sb mt-3">
          <div>Delivery Charges</div>
          <div>Free</div>
        </div>
        <div className="flexRow sb mt-3 mb-3">
          <div>Total Amount</div>
          <div>{totalPrice}</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
