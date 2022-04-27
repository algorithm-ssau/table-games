const Router = require('express')
const express = require("express");
const router = express.Router()
const brandController = require('../controllers/bredController')

router.post('/', brandController.create)
router.get('/', brandController.getAll)

module.exports = router