import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/UI/Card';
import { updateOrder } from '../../redux/actions';

import './style.css';

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  console.log(order);

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }
    return '';
  };

  return (
    <>
      {order.orders.map((orderItem, index) => (
        <Card key={index} headerLeft={orderItem._id} className={'mb-2'}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '50px 50px',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: 'border-box',
              padding: '50px 100px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  key={status._id}
                  className={`orderStatus ${
                    status.isCompleted ? 'active' : ''
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? 'active' : ''}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <select
                className="form-control"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select type</option>
                {orderItem.orderStatus.map((status) => {
                  return !status.isCompleted ? (
                    <option key={status.type} value={status.type}>
                      {status.type}
                    </option>
                  ) : null;
                })}
              </select>
            </div>
            <div>
              <button
                onClick={() => onOrderUpdate(orderItem._id)}
                className="btn btn-outline-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Orders;
