import axios from "axios";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async (dispach) => {
  dispach({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("api/products");
    dispach({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispach({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispach) => {
  dispach({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispach({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispach({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};
