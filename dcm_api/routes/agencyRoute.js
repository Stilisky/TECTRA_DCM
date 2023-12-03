const express = require('express')
var router = express.Router()
const {authAdmin} = require('../middlewares/authMiddleware')
const {
  getAgencies,
  getAgency,
  createAgency,
  updateAgency,
  deleteAgency
} = require('../controllers/agencyController')

router.route('/').get(authAdmin, getAgencies)
router.route('/:agencyId').get(authAdmin, getAgency).put(authAdmin, updateAgency).delete(authAdmin, deleteAgency)
router.route('/register').post(createAgency)

module.exports = router
