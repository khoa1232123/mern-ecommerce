import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/UI/Card';
import { updateCart } from '../../redux/actions/cartActions';
import CartItem from './CartItem';
import './style.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch]);

  const totalPrice = () => {
    let total = 0;
    // eslint-disable-next-line array-callback-return
    Object.keys(cartItems).map((key, index) => {
      // eslint-disable-next-line no-unused-vars
      total = cartItems[key].qty * cartItems[key].price + total;
    });
    return total;
  };

  return (
    <div className="container">
      <div className="flexRow">
        <Card headerLeft={'My Card'} headerRight={<div>Delever to</div>}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem key={index} cartItem={cartItems[key]} />
          ))}
        </Card>
        <Card style={{ width: '500px' }}>Price {totalPrice()}</Card>
      </div>
    </div>
  );
};

export default CartPage;
