const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productController')
const auth = require('../middlewares/auth')
const permit = require('../middlewares/roles')
const { productValidation} = require('../utils/validators')

// Public routes
router.get('/', productCtrl.getProducts)
router.get('/:id', productCtrl.getProduct)

// Protected routes (admin only)
router.post('/', auth, permit('admin'), productValidation, productCtrl.createProduct);
router.put('/:id', auth, permit('admin'), productCtrl.updateProduct);
router.delete('/:id', auth, permit('admin'), productCtrl.deleteProduct);

module.exports = router;
