import {
  USER_LOG_IN_REQUEST,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILED,
  USER_LOG_OUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_UPDATE_BY_ADMIN_REQUEST,
  USER_UPDATE_BY_ADMIN_FAILED,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_BY_ADMIN_RESET,
  USER_DETAIL_BY_ID_REQUEST,
  USER_DETAIL_BY_ID_FAILED,
  USER_DETAIL_BY_ID_SUCCESS,
  USER_DETAIL_BY_ID_RESET,
} from "../constants/UserConstants";

import axios from "axios";

export const userLogIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOG_IN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/login",
      {
        username: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOG_IN_SUCCESS,
      payload: data,
    });

    // set to localstorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOG_IN_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.response.data,
    });
  }
};

export const userRegister =
  (email, password, name, username) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      console.log("the credentials are : ", {
        email,
        password,
        name,
        username,
      });

      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/users/register",
        { name: name, email: email, password: password, username: username },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // set to localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log("the why error ", error.response);
      dispatch({
        type: USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.response.data,
      });
    }
  };

export const userUpdateProfile =
  (email, password, name, username) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/users/profile/update",
        { name: name, email: email, password: password, username: username },
        config
      );

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOG_IN_SUCCESS,
        payload: data,
      });

      // set to localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: USER_UPDATE_RESET });
    } catch (error) {
      console.log("the why  for update error ", error.response);
      dispatch({
        type: USER_UPDATE_FAILED,
        payload: error.response.data.detail,
      });
    }
  };

export const userLogOut = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOG_OUT });
    dispatch({ type: USER_LIST_RESET });

    console.log("the error: ");

    // remove from localstorage
    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log("the error: ", error);
  }
};

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo?.token}`,
      },
    };
    const { data } = await axios.get("/api/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("the why  for LIST error ", error);
    dispatch({
      type: USER_LIST_FAILED,
      payload: error?.response?.data.detail,
    });
  }
};

export const deleteUserById = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/delete/${pk}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("the why  for DELETE error ", error.response);
    dispatch({
      type: USER_DELETE_FAILED,
      payload: error.response.data.detail,
    });
  }
};

export const userUpdateById =
  (email, name, username, isAdmin, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_BY_ADMIN_REQUEST });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/${id}/update`,
        { name: name, email: email, isAdmin: isAdmin, username: username },
        config
      );

      dispatch({
        type: USER_UPDATE_BY_ADMIN_SUCCESS,
        payload: data,
      });

      dispatch({ type: USER_DETAIL_BY_ID_RESET });
      dispatch({ type: USER_UPDATE_BY_ADMIN_RESET });
    } catch (error) {
      console.log("the why  for update error ", error.response);
      dispatch({
        type: USER_UPDATE_BY_ADMIN_FAILED,
        payload: error.response.data.detail,
      });
    }
  };

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    
    dispatch({ type: USER_DETAIL_BY_ID_REQUEST });

    const { user } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAIL_BY_ID_SUCCESS,
      payload: data,
    });

    // dispatch({ type: USER_DETAIL_BY_ID_RESET });
  } catch (error) {
    console.log("the why  for update error ", error);
    dispatch({
      type: USER_DETAIL_BY_ID_FAILED,
      payload: error?.response?.data.detail,
    });
  }
};
