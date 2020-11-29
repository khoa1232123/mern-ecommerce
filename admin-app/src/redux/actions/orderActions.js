import axios from '../../helpers/axios';

export const updateOrder = (payload) => {
  return async (dispatch) => {
    // dispatch({ type: pageTypes.CREATE_PAGE_REQUEST });
    try {
      const res = await axios.post('/admin/order/update', payload);
      console.log(res);
      if (res.status === 201) {
        // console.log('1');
        // dispatch({
        //   type: pageTypes.CREATE_PAGE_SUCCESS,
        //   payload: { page: res.data.page },
        // });
      } else {
        // console.log('2');
        // dispatch({
        //   type: pageTypes.CREATE_PAGE_FAILURE,
        //   payload: { error: res.data.error },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
