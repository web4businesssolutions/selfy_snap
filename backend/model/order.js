const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 },
            seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Card', 'UPI', 'NetBanking'],
        default: 'COD'
    },
    status: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed'
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phone: String
    }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
