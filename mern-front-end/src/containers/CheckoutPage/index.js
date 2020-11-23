import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import { getAddress } from '../../redux/actions';
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
      {body && body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
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

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
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
              <div>{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
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
          body={orderSummary ? <CartPage onlyCartItems={true} /> : null}
        />

        <CheckoutStep stepNumber={'3'} title={'Order summary'} />
      </div>
      <PriceDetails />
    </div>
  );
};

export default CheckoutPage;
