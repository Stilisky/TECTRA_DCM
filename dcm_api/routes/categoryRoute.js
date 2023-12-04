const express = require('express')
var router = express.Router()
const {authAdmin} = require('../middlewares/authMiddleware')
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoryController')

router.route('/').get(authAdmin, getCategories).post(authAdmin, createCategory)
router.route('/:catId').get(authAdmin, getCategory).put(authAdmin, updateCategory).delete(authAdmin, deleteCategory)

module.exports = router
