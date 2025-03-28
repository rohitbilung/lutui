const express = require('express');
const router = express.Router();
const { 
    createProduct,
    getProducts,
    getProductsById,
    deleteProduct
 } = require('../controllers/product.controller');
 const {auth} = require('../middlewares/auth')

router.post('/create-product', createProduct);

router.get('/get-product-by-id', getProductsById);

router.get('/get-products', auth, getProducts)

router.delete('/delete-product', auth, deleteProduct)

module.exports = router;
