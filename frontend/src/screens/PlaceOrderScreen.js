import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";

export default function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var zero = 0;
    var ten = 10;
    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate("/shipping");
        }
    }, [navigate, cart]);

    cart.itemsPrice = Number(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)
    );

    cart.shippingPrice = Number(
        cart.itemsPrice > 50 ? zero.toFixed(2) : ten.toFixed(2)
    );

    cart.taxPrice = Number((0.24 * cart.itemsPrice).toFixed(2));

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {};
    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {cart.shippingAddress.fullName} <br />
                                    <br />
                                    <strong>Address:</strong>{" "}
                                    {cart.shippingAddress.address},{" "}
                                    {cart.shippingAddress.city},{" "}
                                    {cart.shippingAddress.postalCode},{" "}
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method selected:</strong>{" "}
                                    {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty}x{item.price}€ ={" "}
                                                    {item.qty * item.price}€
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <ul>
                        <div className="card card-body">
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items:</div>
                                    <div>{cart.itemsPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        Shipping <span>&#40;</span>free if total
                                        price is greater than 50€
                                        <span>&#41;</span>:
                                    </div>

                                    <div>{cart.shippingPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        Tax <span>&#40;</span>24%
                                        <span>&#41;</span>:
                                    </div>
                                    <div>{cart.taxPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total price:</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            {cart.totalPrice.toFixed(2)}€
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary button block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    <span>Place Order</span>
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
