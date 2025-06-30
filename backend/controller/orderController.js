const Order = require('../model/order');
const Cart = require('../model/cart');
const Product = require('../model/product');

// Place an order (from cart)
exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const items = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            seller: item.product.seller
        }));

        const totalAmount = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            paymentMethod: 'COD'
        });

        // Clear cart
        await Cart.deleteOne({ user: userId });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Customer: Get my orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Seller: Get orders containing their products
// exports.getSellerOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ 'items.seller': req.user.id }).populate('items.product');
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




exports.getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const orders = await Order.find({ 'items.seller': sellerId })
            .populate('user', 'name email') // optional
            .populate('items.product', 'name price images'); // ✅ fixed fields

        const sellerOrders = orders.map(order => {
            const sellerItems = order.items.filter(item => item.seller.toString() === sellerId);
            return {
                ...order.toObject(),
                items: sellerItems
            };
        });

        res.json(sellerOrders);
    } catch (error) {
        console.error("❌ Get Seller Orders Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product user');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const validStatuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        const { status } = req.body;

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
