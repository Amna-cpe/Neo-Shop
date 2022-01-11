import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_TOTAL,
  CART_RESET
} from "../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === newItem.product
      );

      // if the item exist then just update it with the new one
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((ci) =>
            ci.product === existItem.product ? newItem : ci
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (ci) => ci.product !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_UPDATE_TOTAL:
      const totalPrice = state.cartItems
        .reduce(
          (acc, item) => acc + parseInt(item.qty) * parseFloat(item.price),
          0
        )
        .toFixed(2);
      return {
        ...state,
        total: totalPrice,
      };

    case CART_RESET:
      return{

      };

    default:
      return state;
  }
};
