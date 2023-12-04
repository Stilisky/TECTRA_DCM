const express = require('express')
var router = express.Router()
const {auth, authAdmin} = require('../middlewares/authMiddleware')
const {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController')

router.route('/').get(auth, getClients).post(auth, createClient)
router.route('/:clientId').get(auth, getClient).put(authAdmin, updateClient).delete(authAdmin, deleteClient)

module.exports = router