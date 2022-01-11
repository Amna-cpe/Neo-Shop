import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_FAILED,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_RESET,
  ORDER_PAY_FAILED,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,

  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILED,
  GET_ALL_ORDERS_RESET,

  ORDER_DELEVER_FAILED,
  ORDER_DELEVER_REQUEST,
  ORDER_DELEVER_SUCCESS,
  ORDER_DELEVER_RESET,


} from "../constants/OrderConstant";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };

    case ORDER_CREATE_FAILED:
      return { loading: false, error: action.payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { loading: true };

    case ORDER_DETAIL_SUCCESS:
      return { loading: false, orderDetail: action.payload };

    case ORDER_DETAIL_FAILED:
      return { loading: false, error: action.payload };

    case ORDER_DETAIL_RESET:
      return {};

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_PAY_FAILED:
      return { loading: false, error: action.payload };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const userOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true };

    case GET_ORDERS_SUCCESS:
      return { loading: false, userOrders: action.payload };

    case GET_ORDERS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const getAllOrdersReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true };

    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };

    case GET_ALL_ORDERS_FAILED:
      return { loading: false, error: action.payload };

    case GET_ALL_ORDERS_RESET:
      return {};

    default:
      return state;
  }
};


export const orderDeleverRReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELEVER_REQUEST:
      return { loading: true };

    case ORDER_DELEVER_SUCCESS:
      return { loading: false, success: true };

    case ORDER_DELEVER_FAILED:
      return { loading: false, error: action.payload };

    case ORDER_DELEVER_RESET:
      return {};

    default:
      return state;
  }
};
