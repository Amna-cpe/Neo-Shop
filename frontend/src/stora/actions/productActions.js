import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_SUCCESS,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_RESET,

  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_RESET,
  
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_RESET,

  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAILED,
  PRODUCT_EDIT_RESET,

  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAILED,
  PRODUCT_REVIEW_RESET,

  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

import {ORDER_DETAIL_RESET} from "../constants/OrderConstant"

import axios from "axios";

export const listProducts = (keyword , page) => async (dispatch) => {
  try {
    if(!page){
      page = 1
    }
    let query
    if (keyword){
       query = `?keyword=${keyword}&page=${page}`;
    }else query = `?keyword=&page=${page}`
    
    console.log(query , "th equery")
    dispatch({ type: ORDER_DETAIL_RESET });
      
    
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products${query}`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_TOP_REQUEST })

      const { data } = await axios.get(`/api/products/topRated`)

      dispatch({
          type: PRODUCT_TOP_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: PRODUCT_TOP_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}

export const listProductDetail = (id) => async (dispatch) => {
  try {
    console.log("you are in the watinrg zone");
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${id}/delete`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DELETE_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_CREATE_RESET });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PRODUCT_CREATE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const editProduct = (product,id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/update/${id}`, product, config);

    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_EDIT_RESET });
    dispatch({ type: PRODUCT_DETAILS_RESET });

  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PRODUCT_EDIT_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};



export const createReview = (review,id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/${id}/review`, review, config);

    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_REVIEW_RESET });

  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PRODUCT_REVIEW_FAILED,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
