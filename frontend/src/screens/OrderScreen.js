import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderScreen() {
    const params = useParams();
    const orderId = params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order) {
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady]);

    const successPaymentHandler = () => {};

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>
                Your order has been placed!
                <br />
                <br />
                Order id: {order._id}
            </h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {order.shippingAddress.fullName} <br />
                                    <br />
                                    <strong>Address:</strong>{" "}
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox varient="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox varient="danger">
                                        Not delivered
                                    </MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method selected:</strong>{" "}
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <MessageBox varient="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox varient="danger">
                                        Not paid
                                    </MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order items</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
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
                                    <div>{order.itemsPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        Shipping <span>&#40;</span>free if total
                                        price is greater than 50€
                                        <span>&#41;</span>:
                                    </div>

                                    <div>{order.shippingPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        Tax <span>&#40;</span>24%
                                        <span>&#41;</span>:
                                    </div>
                                    <div>{order.taxPrice.toFixed(2)}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total price:</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            {order.totalPrice.toFixed(2)}€
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            {!order.isPaid && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                            onButtonReady={() => {
                                                setSdkReady(true);
                                            }}
                                        ></PayPalButton>
                                    )}
                                </li>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
