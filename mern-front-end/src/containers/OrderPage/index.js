import React, { useEffect } from 'react';
import Card from '../../components/UI/Card';
import { getOrders } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="container">
      {user.orders.map((order) => {
        return order.items.map((item, index) => {
          console.log('bbb');
          return (
            <Card key={index}>
              <div className="orderItemContainer flexRow">
                <div className="orderImgContainer mr-2" style={{ width: 120 }}>
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt=""
                  />
                </div>
                <div className="flexRow sb orderContent">
                  <div>{item.productId.name}</div>
                  <div>${item.payablePrice}</div>
                  <div>{item.purchasedQty} items</div>
                  <div>{order.paymentStatus}</div>
                </div>
              </div>
            </Card>
          );
        });
      })}
    </div>
  );
};

export default OrderPage;
