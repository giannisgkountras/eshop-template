import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function CartScreen() {
  const productId = useParams();
  const [searchParams] = useSearchParams();
  const qty = [searchParams] ? Number(searchParams.get("qty")) : 1;

  return (
    <div>
      <h1>CartScreen</h1>
      <p>
        Add to Cart: productId: {productId.id} qty:{qty}
      </p>
    </div>
  );
}
