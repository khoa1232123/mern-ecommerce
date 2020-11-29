import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import { getAddress, addOrder } from '../../redux/actions';
import CartPage from '../CartPage';
import Address from './Address';
import AddressForm from './AddressForm';
import './style.css';

const CheckoutStep = ({
  active,
  stepNumber,
  title,
  body,
  onClick,
  ...props
}) => {
  return (
    <div className="checkoutStep">
      <div className={`checkoutHeader ${active && 'active'}`} onClick={onClick}>
        <div>
          <span className="stepNumber">{stepNumber}</span>
          <span className="stepTitle">{title}</span>
        </div>
      </div>
      {body && <div className="checkoutBody"> {body}</div>}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [orderSummary, setOrderSummary] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const onConfirmOrder = () => {
    console.log('abc');
    const totalPrice = Object.keys(cart.cartItems).reduce((total, key) => {
      const { price, qty } = cart.cartItems[key];
      return total + price * qty;
    }, 0);
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      items,
      paymentStatus: 'pending',
      paymentType: 'cod',
    };
    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate, dispatch]);

  useEffect(() => {
    const value = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(value);
  }, [user.address]);

  if (confirmOrder) {
    return (
      <div>
        <Card>
          <div>Thank you</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="checkoutContainer">
        <CheckoutStep
          stepNumber={'1'}
          title={'Login'}
          active={!auth.authenticate}
          body={
            auth.authenticate ? (
              <div className="loggedInId">
                <span style={{ fontWeight: 500 }}>Username</span>
                <span style={{ margin: '0 5px' }}>test@gmail.com</span>
              </div>
            ) : (
              <div>
                <MaterialInput label="Email" />
              </div>
            )
          }
        />
        <CheckoutStep
          stepNumber={'2'}
          title={'Delivery address'}
          active={!confirmAddress}
          // eslint-disable-next-line array-callback-return
          body={
            confirmAddress ? (
              <div>{` ${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
            ) : (
              address.map((adr, index) => (
                <Address
                  key={index}
                  selectAddress={selectAddress}
                  enableAddressEditForm={enableAddressEditForm}
                  confirmDeliveryAddress={confirmDeliveryAddress}
                  onAddressSubmit={onAddressSubmit}
                  adr={adr}
                />
              ))
            )
          }
        />

        {confirmAddress ? null : newAddress ? (
          <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
        ) : (
          <CheckoutStep
            stepNumber="+"
            title="ADD NEW ADDRESS"
            active={false}
            onClick={() => setNewAddress(!newAddress)}
          />
        )}

        <CheckoutStep
          stepNumber={'3'}
          title={'Order summary'}
          active={orderSummary}
          body={
            orderSummary ? (
              <CartPage onlyCartItems={true} />
            ) : orderConfirmation ? (
              <div>{Object.keys(cart.cartItems).length} Items</div>
            ) : null
          }
        />
        {orderSummary && (
          <Card className="mb-2">
            <div className="flexRow sb p-3 align-items-center">
              <p style={{ marginBottom: 0 }}>
                Order confirmation email will be sent to{' '}
                <b>{auth.user.email}</b>
              </p>
              <MaterialButton
                title={'Continue'}
                onClick={userOrderConfirmation}
                style={{ width: '250px' }}
              />
            </div>
          </Card>
        )}
        <CheckoutStep
          stepNumber={'4'}
          title={'Order summary'}
          active={paymentOption}
          body={
            paymentOption && (
              <div>
                <div>
                  <input type="radio" name="paymentOption" id="paymentOption" />
                  <label htmlFor="paymentOption" className="ml-2">
                    Cash on delivery
                  </label>
                </div>
                <MaterialButton
                  title="Confirm order"
                  style={{
                    width: '200px',
                    marginRight: 0,
                    marginLeft: 'auto',
                  }}
                  onClick={onConfirmOrder}
                />
              </div>
            )
          }
        />
      </div>
      <PriceDetails />
    </div>
  );
};

export default CheckoutPage;
