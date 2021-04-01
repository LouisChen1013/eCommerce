import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; // shows a history of the changes to the state in your Redux Store over time.
import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({ productListReducer });

const initialState = {};

const middleware = [thunk];

// https://redux.js.org/api/createstore
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
