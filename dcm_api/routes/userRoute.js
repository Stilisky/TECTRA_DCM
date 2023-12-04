const express = require('express')
var router = express.Router()
const {authAdmin, auth, authCommercial} = require('../middlewares/authMiddleware')
const {
  deleteUser,
  getUser,
  getUsers,
  login,
  register,
  updateUser,
  compteStatusUpdate
} = require('../controllers/userController')

router.route('/users').get(authAdmin, getUsers)
router.route('/users/:userId').get(auth, getUser).put(auth, updateUser).delete(authAdmin, deleteUser)
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/activateCompte/:commercialId').post(authAdmin, compteStatusUpdate)

module.exports = router