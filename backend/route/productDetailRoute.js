const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createProductDetail, getAllProductDetails, deleteProductDetail, updateProductDetail, getSingleProductDetail } = require('../controller/productDetailController');


router.post('/createdetail', upload.any(), createProductDetail);
router.get('/alldetails', getAllProductDetails);
router.get('/singledetail/:id', getSingleProductDetail);
router.delete('/delete/:id', deleteProductDetail);
router.put('/update/:id', upload.any(), updateProductDetail);

module.exports = router;
