import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';
import { getAddress } from '../../redux/actions';
import AddressForm from './AddressForm';
import './style.css';

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div className={`checkoutHeader ${props.active && 'active'}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddressSubmit = () => {};

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  return (
    <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
      <div className="checkoutContainer">
        <CheckoutStep
          stepNumber={'1'}
          title={'Login'}
          active={auth.authenticate}
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
          active={false}
          // eslint-disable-next-line array-callback-return
          body={user.address.map((adr, index) => {
            return (
              <div key={index} className="flexRow addressContainer">
                <div>
                  <input type="radio" name="address" />
                </div>
                <div className="flexRow sb addressinfo">
                  <div>
                    <div>
                      <span>{adr.name}</span>
                      <span>{adr.addressType}</span>
                      <span>{adr.mobileNumber}</span>
                    </div>
                    <div>{adr.address}</div>
                    <MaterialButton
                      title={'Delivery Here'}
                      style={{
                        width: '250px',
                      }}
                    />
                  </div>
                  <div>Edit</div>
                </div>
              </div>
            );
          })}
        />
        <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
        <CheckoutStep stepNumber={'3'} title={'Order summary'} />
      </div>
    </div>
  );
};

export default CheckoutPage;
