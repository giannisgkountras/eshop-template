import { combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { legacy_createStore as createStore } from "redux";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunkMiddleware)));

export default store;
