const express = require('express');
const {
    placeOrder,
    getMyOrders,
    getSellerOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controller/orderController');
const { isAuthenticated, isSeller, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/seller', isAuthenticated, isSeller, getSellerOrders);
router.post('/place', isAuthenticated, placeOrder);
router.get('/my', isAuthenticated, getMyOrders);
// router.get('/seller', isAuthenticated, isSeller, getSellerOrders);
router.get('/admin', isAuthenticated, isAdmin, getAllOrders);
router.put('/admin/update/:id', isAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;
