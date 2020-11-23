import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import { getCartItems } from '../../redux/actions';
import CartItem from './CartItem';
import './style.css';

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { cartItems } = cart;
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [dispatch, auth]);

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem key={index} cartItem={cartItems[key]} />
        ))}
      </>
    );
  }

  return (
    <div className="container">
      <div className="flexRow">
        <Card headerLeft={'My Card'} headerRight={<div>Delever to</div>}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem key={index} cartItem={cartItems[key]} />
          ))}
          <div
            style={{
              width: '100%',
              display: 'flex',
              background: '#fff',
              boxShadow: '0 0 10px 10px #eee',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: '250px' }}>
              <MaterialButton
                title="Place order"
                onClick={() => props.history.push('/checkout')}
              />
            </div>
          </div>
        </Card>
        <PriceDetails />
      </div>
    </div>
  );
};

export default CartPage;
