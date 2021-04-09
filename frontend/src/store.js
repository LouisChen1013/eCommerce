import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; // shows a history of the changes to the state in your Redux Store over time.
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productListReducer,
  productDetailsReducer,
  cartReducer,
  userLoginReducer,
  userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []; // since our localStorage value is string, we have to convert back to a javascript object

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cartReducer: { cartItems: cartItemsFromStorage },
  userLoginReducer: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// https://redux.js.org/api/createstore
// We can obtain the global state/value using useSelector, we defined these earlier when combining reducers(e.g., productListReducer).
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
