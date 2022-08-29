import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useParams,
    useSearchParams,
    useNavigate,
} from "react-router-dom";
import { addToCart, clearCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen() {
    const productId = useParams();
    const [searchParams] = useSearchParams();
    const qty = [searchParams] ? Number(searchParams.get("qty")) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId.id) {
            dispatch(addToCart(productId.id, qty));
        }
    }, [dispatch, productId.id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const clearCartHandler = () => {
        dispatch(clearCart());
    };
    let navigate = useNavigate();
    const checkoutHandler = () => {
        navigate("/signin?redirect=shipping");
    };
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is Empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="small"
                                        ></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>{item.price} €</div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <div className="row">
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (total, thing) => total + thing.qty,
                                        0
                                    )}{" "}
                                    items) :{" "}
                                    {cartItems.reduce(
                                        (a, c) => a + c.price * c.qty,
                                        0
                                    )}{" "}
                                    €
                                </h2>
                                <button
                                    type="button"
                                    onClick={clearCartHandler}
                                    disabled={cartItems.length === 0}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary button block"
                                disabled={cartItems.length === 0}
                            >
                                <span>Proceed to Checkout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
