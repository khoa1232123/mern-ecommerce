import { orderTypes } from '../types';

const initialState = {
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case orderTypes.GET_CUSTOMER_ORDER_SUCCESS:
      return { ...state, orders: payload.orders };

    default:
      return state;
  }
};
