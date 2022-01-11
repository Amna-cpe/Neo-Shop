import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAILED,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_RESET,

  ORDER_PAY_FAILED,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,

  ORDER_DELEVER_FAILED,
  ORDER_DELEVER_REQUEST,
  ORDER_DELEVER_SUCCESS,
  ORDER_DELEVER_RESET,
  
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILED,
  GET_ALL_ORDERS_RESET,
} from "../constants/OrderConstant";

import { CART_RESET } from "../constants/CartConstants";

import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/orders/add", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ORDER_CREATE_RESET,
    });

    dispatch({
      type: CART_RESET,
    });

    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  } catch (error) {
    console.log("the error ", error);
    dispatch({
      type: ORDER_CREATE_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: ORDER_DETAIL_RESET,
    // });
  } catch (error) {
    console.log("the error ", error.response);
    dispatch({
      type: ORDER_DETAIL_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    console.log("paying 2 with id", id, paymentResult);

    dispatch({ type: ORDER_PAY_REQUEST });

    const { user } = getState();

    console.log(user);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo.access}`,
      },
    };

    console.log("the config is", config
    );

    const { data } = await axios.put(`/api/orders/${id}/pay`,paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ORDER_PAY_RESET,
    });
  } catch (error) {
    console.log("the error ", error.response);
    dispatch({
      type: ORDER_PAY_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};




export const getMyOrders = () => async (dispatch, getState) => {
  try {

    dispatch({ type: ORDER_DETAIL_RESET });
    dispatch({ type: GET_ORDERS_REQUEST });


    const { user } = getState();

    console.log(user)
   
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo.access}`,
      },
    };

  

    const { data } = await axios.get('/api/orders/myorders', config);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });

 
  } catch (error) {
    console.log("the error ", error.response);
    dispatch({
      type: GET_ORDERS_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};



export const getAllOrders = () => async (dispatch, getState) => {
  try {

    dispatch({ type: ORDER_DETAIL_RESET });

    dispatch({ type: GET_ALL_ORDERS_REQUEST });


    const { user } = getState();

   
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo.access}`,
      },
    };

  

    const { data } = await axios.get('/api/orders/', config);

    console.log(data)
    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });

 
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};


export const markAsDelevered = (id) => async (dispatch, getState) => {
  try {

    dispatch({ type: ORDER_DELEVER_REQUEST });

    const { user } = getState();



    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo.access}`,
      },
    };


    const { data } = await axios.put(`/api/orders/${id}/delievered`,{}, config);

    dispatch({
      type: ORDER_DELEVER_SUCCESS,
      payload: data,
    });

  
  } catch (error) {
    console.log("the error ", error.response);
    dispatch({
      type: ORDER_DELEVER_FAILED,
      payload: error?.response?.data?.detail,
    });
  }
};
