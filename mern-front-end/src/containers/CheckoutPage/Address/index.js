import React from 'react';
import { Anchor, MaterialButton } from '../../../components/MaterialUI';
import AddressForm from '../AddressForm';

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input type="radio" onClick={() => selectAddress(adr)} name="address" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: '100%' }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="Edit"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{ fontWeight: '500', color: '#2874f0' }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br />
              {adr.state} - {adr.pinCode}
            </div>
            {adr.selected && (
              <MaterialButton
                title={'Delivery Here'}
                style={{
                  width: '250px',
                }}
                onClick={() => confirmDeliveryAddress(adr)}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Address;
