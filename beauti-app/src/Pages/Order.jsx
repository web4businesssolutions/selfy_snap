import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import {
    FiShoppingCart,
    FiBox,
    FiTag,
    FiHash,
    FiCreditCard,
    FiTruck,
    FiCheckCircle
} from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
    const { cartItems, clearCart } = useCart();
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    //   const navigate = useNavigate();
    const DELIVERY_CHARGE = 49;

    const subtotal = cartItems.reduce((acc, item) => {
        if (!item.product) return acc;
        return acc + item.product.price * item.quantity;
    }, 0);
    const total = subtotal + DELIVERY_CHARGE;

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/orders/my', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders:', err.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePlaceOrder = async () => {
        try {
            await axios.post(
                'http://localhost:4000/api/orders/place',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Order placed successfully!');
            clearCart();
            await fetchOrders();
        } catch (error) {
            const message = error?.response?.data?.error || 'Failed to place order';
            toast.error(message);
            console.error('Order error:', message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <ToastContainer position="top-right" autoClose={2000} />
            {cartItems.length > 0 && (
                <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <FiCheckCircle /> Review & Place Order
                </h1>
            )}

            {cartItems.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {/* Cart Preview */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(({ product, quantity }) => (
                            product && (
                                <div key={product._id} className="flex gap-4 border rounded-lg p-3 shadow-sm bg-white">
                                    <img
                                        src={`${product.images[0]}`}
                                        alt={product.name}
                                        className="w-20 h-20 object-contain border rounded"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-1">
                                            <FiBox /> {product.name}
                                        </h2>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <FiTag /> Brand: {product.brandName}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <FiCreditCard /> ₹{product.price} x {quantity}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                <FiHash /> ₹{product.price * quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <FiCheckCircle /> Order Summary
                        </h3>
                        <div className="flex justify-between text-sm mb-2 text-gray-600">
                            <span className="flex items-center gap-1"><FiCreditCard /> Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2 text-gray-600">
                            <span className="flex items-center gap-1"><FiTruck /> Delivery</span>
                            <span>₹{DELIVERY_CHARGE}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base border-t pt-3 mt-3 text-gray-800">
                            <span className="flex items-center gap-1"><FiCheckCircle /> Total</span>
                            <span>₹{total}</span>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-4 bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition-all text-center flex items-center justify-center gap-2"
                        >
                            <FiCheckCircle /> Place Order
                        </button>
                    </div>
                </div>
            )}

            {/* Orders History */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiBox /> Your Recent Orders
                </h2>

                {orders.length === 0 ? (
                    <div className="text-gray-500 text-sm">No orders found.</div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
                                <div className="mb-2 text-sm text-gray-600">
                                    <span className="font-medium">Payment:</span> {order.paymentMethod} |{" "}
                                    <span className="font-medium">Status:</span> {order.status}
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="flex gap-3 border rounded p-2 bg-gray-50">
                                            <img
                                                src={`${item.product?.images?.[0]}`}
                                                alt={item.product?.name}
                                                className="w-16 h-16 object-contain border rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{item.product?.name}</h3>
                                                <p className="text-xs text-gray-600">Brand: {item.product?.brandName}</p>
                                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{item.product?.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
