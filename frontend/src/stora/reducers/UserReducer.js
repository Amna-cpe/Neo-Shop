import {
  USER_LOG_IN_REQUEST,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILED,

  USER_LOG_OUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,

  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,

  USER_UPDATE_BY_ADMIN_REQUEST,
  USER_UPDATE_BY_ADMIN_FAILED,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_BY_ADMIN_RESET,

  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,

  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,

  USER_DETAIL_BY_ID_REQUEST,
  USER_DETAIL_BY_ID_FAILED,
  USER_DETAIL_BY_ID_SUCCESS,
  USER_DETAIL_BY_ID_RESET
} from "../constants/UserConstants";

export const UserReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_LOG_IN_REQUEST:
      return { loading: true, userInfo: {} };

    case USER_LOG_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOG_IN_FAILED:
      return { loading: false, error: action.payload };

    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };

    case USER_LOG_OUT:
      return {};

    default:
      return state;
  }
};

export const userUpdateReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_UPDATE_FAILED:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { loading: false, userInfo: {} };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAILED:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return {
        users: [],
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const userUpdateByIdReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_BY_ADMIN_REQUEST:
      return { loading: true };

    case USER_UPDATE_BY_ADMIN_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_BY_ADMIN_FAILED:
      return { loading: false, error: action.payload };

    case USER_UPDATE_BY_ADMIN_RESET:
      return { };

    default:
      return state;
  }
};


export const getUserByIdReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_DETAIL_BY_ID_REQUEST:
      return { loading: true };

    case USER_DETAIL_BY_ID_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_DETAIL_BY_ID_FAILED:
      return { loading: false, error: action.payload };

    case USER_DETAIL_BY_ID_RESET:
      return { loading: false, userInfo: {} };

    default:
      return state;
  }
};