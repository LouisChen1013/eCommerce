import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

const cartItems = [];
const shippongAddress = {};

export const cartReducer = (state = { cartItems, shippongAddress }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // check if an item is added in our cart already, comparing cartItems(old item) with payload(new item)
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      ); // .product is equal to _id which we set in payload (cartActions)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (cartItem) =>
              cartItem.product === existItem.product ? item : cartItem // replace/update old(exist) item with new item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
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
    default:
      return state;
  }
};
