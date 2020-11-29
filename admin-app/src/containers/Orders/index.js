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

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  return (
    <>
      {order.orders.map((orderItem, index) => (
        <Card key={index} headerLeft={orderItem._id} className={'mb-2'}>
          <div
            style={{
              boxSizing: 'border-box',
              padding: '50px 100px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="orderTrack">
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Packed</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Shipped</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Delivered</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
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
