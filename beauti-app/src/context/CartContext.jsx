import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');

    // 🟡 Calculate total quantity for icon
    const cartCount = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

    // 🟢 Fetch cart on mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get('https://selfy-snap-o6ka.onrender.com/api/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const validItems = Array.isArray(res.data?.items)
                    ? res.data.items.filter(i => i?.quantity > 0)
                    : [];
                setCartItems(validItems);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setCartItems([]); // fallback to empty
            }
        };

        if (token) fetchCart();
    }, [token]);

    // ➕ Add to cart
    const addToCart = async (product) => {
        try {
            const res = await axios.post(
                'https://selfy-snap-o6ka.onrender.com/api/cart/add',
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    // 🔁 Update quantity
    const updateQuantity = async (productId, quantity) => {
        try {
            const res = await axios.put(
                'https://selfy-snap-o6ka.onrender.com/api/cart/update',
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    // ❌ Remove
    const removeFromCart = async (productId) => {
        try {
            const res = await axios.delete(
                `https://selfy-snap-o6ka.onrender.com/api/cart/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const validItems = Array.isArray(res.data?.items)
                ? res.data.items.filter(i => i?.quantity > 0)
                : [];
            setCartItems(validItems);
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
