import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  productReviewReducer,
  productTopRatedReducer,
} from "./reducers/ProductReducer";
import { cartReducer } from "./reducers/CartReducer";
import {
  UserReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateByIdReducer,
  getUserByIdReducer,
} from "./reducers/UserReducer";
import {
  orderReducer,
  orderDetailReducer,
  orderPayReducer,
  userOrdersReducer,
  getAllOrdersReducer,
  orderDeleverRReducer,
} from "./reducers/OrderReducer";
import jwtDecode from "jwt-decode";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  user: UserReducer,
  userById: getUserByIdReducer,
  userUpdate: userUpdateReducer,
  userUpdateById: userUpdateByIdReducer,
  userList: userListReducer,
  order: orderReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  userOrders: userOrdersReducer,
  userDelete: userDeleteReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  allOrders: getAllOrdersReducer,
  orderDelever: orderDeleverRReducer,
  reviewProduct: productReviewReducer,
  productTopRated: productTopRatedReducer,
});

if (localStorage.getItem("userInfo")) {
  // if it is exists and it it is more than one hour then reset
  const TOKEN = JSON.parse(localStorage.getItem("userInfo")).token;

  const DecodedToken = jwtDecode(TOKEN);
  if (DecodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("userInfo");
  }
}

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const totalPrice = cartItemsFromStorage
  .reduce((acc, item) => acc + parseInt(item.qty) * parseFloat(item.price), 0)
  .toFixed(2);

const UserInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const ShippingInfoFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const PaymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: ShippingInfoFromStorage,
    paymentMethod: PaymentMethodFromStorage,
    total: totalPrice,
  },
  user: { userInfo: UserInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
