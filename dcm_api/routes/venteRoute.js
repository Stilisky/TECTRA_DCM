const express = require('express')
var router = express.Router()
const {authAdmin, auth} = require('../middlewares/authMiddleware')
const {
   getVentes,
   getVente,
   createVente,
   updateVente,
   deleteVente
} = require('../controllers/VenteController')

router.route('/').get(authAdmin, getVentes).post(auth, createVente)
router.route('/:venteId').get(auth, getVente).put(auth, updateVente).delete(authAdmin, deleteVente)

module.exports = router