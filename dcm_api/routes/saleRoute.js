const express = require('express')
var router = express.Router()
const {authAdmin, auth} = require('../middlewares/authMiddleware')
const {
   getSales,
   getSale,
   createSale,
   updateSale,
   deleteSale
} = require('../controllers/saleController')

router.route('/').get(authAdmin, getSales)
router.route('/saleId').get(auth, getSale).put(auth, updateSale).delete(authAdmin, deleteSale)
router.route('/client/:clientId').post(createSale)

module.exports = router