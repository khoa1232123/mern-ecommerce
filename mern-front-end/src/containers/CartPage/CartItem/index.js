import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartActions';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const CartItem = ({ cartItem }) => {
  const { _id, name, price, qty, img } = cartItem;
  const dispatch = useDispatch();
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProductContainer">
          <img src={generatePublicUrl(img)} alt="cart" />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>$ {price}</p>
          </div>
          <div>delivery in 3 - 5 days</div>
        </div>
      </div>
      <div className="flexRow mb-3 mt-3">
        <div className="quantityControl flexRow mr-4">
          <button
            className="cartActionBtn btn btn-warning btn-sm"
            onClick={() => {
              if (qty <= 1) return;
              dispatch(addToCart(cartItem, -1));
            }}
          >
            -
          </button>
          <input
            type="text"
            value={qty}
            readOnly
            className="form-control input-sm"
          />
          <button
            className="cartActionBtn btn btn-primary btn-sm"
            onClick={() => {
              dispatch(addToCart(cartItem));
            }}
          >
            +
          </button>
        </div>
        <button className="cartActionBtn btn btn-warning btn-sm mr-2">
          Save For Later
        </button>
        <button className="cartActionBtn btn btn-danger btn-sm">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
