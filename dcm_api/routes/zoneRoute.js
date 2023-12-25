const express = require('express')
var router = express.Router()
const {authAdmin} = require('../middlewares/authMiddleware')
const {createZone, getZones} = require('../controllers/ZoneController')

router.route('/').get(getZones).post(authAdmin, createZone)

module.exports = router