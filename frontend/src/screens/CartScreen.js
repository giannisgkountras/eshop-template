import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

export default function CartScreen() {
  const productId = useParams();
  const [searchParams] = useSearchParams();
  const qty = [searchParams] ? Number(searchParams.get("qty")) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId.id, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      <h1>CartScreen</h1>
      <p>
        Add to Cart: productId: {productId.id} qty:{qty}
      </p>
    </div>
  );
}
