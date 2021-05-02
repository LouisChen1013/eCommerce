import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // Returns the current state tree(object) of your application. It is equal to the last value returned by the store's reducer.
  // console.log(getState());
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems) // localStorage key/value only accepts string
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems) // localStorage key/value only accepts string
  );
};

export const saveShippingAddress = (shippingData) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingData,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
};

export const savePaymentMethod = (paymentData) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentData,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(paymentData));
};
