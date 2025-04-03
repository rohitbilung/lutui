const express = require('express');
const router = express.Router();
const { 
    createProduct,
    getProducts,
    getProductsById,
    deleteProduct
 } = require('../controllers/product.controller');
 const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/create-product',isAdmin, createProduct);

router.get('/get-product-by-id',isLoggedIn, getProductsById);

router.get('/get-products', getProducts);

// router.delete('/delete-product', auth, deleteProduct)

module.exports = router;
