import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; // shows a history of the changes to the state in your Redux Store over time.
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({ productListReducer, productDetailsReducer });

const initialState = {};

const middleware = [thunk];

// https://redux.js.org/api/createstore
// We can obtain the global state/value using useSelector, we defined these earlier when combining reducers(e.g., productListReducer).
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
