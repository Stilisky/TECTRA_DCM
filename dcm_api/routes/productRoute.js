const express = require('express')
var router = express.Router()
const {auth, authAdmin} = require('../middlewares/authMiddleware')
const {
   getProduct,
   getProducts,
   createProduct,
   updateProduct,
   deleteProduct
} = require('../controllers/productController')

router.route('/').get(auth, getProducts)
router.route('/:prodId').get(auth, getProduct).put(authAdmin, updateProduct).delete(authAdmin, deleteProduct)
router.route('/category/:catId').post(authAdmin, createProduct)

module.exports = router