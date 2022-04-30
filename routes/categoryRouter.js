const Router = require('express')
const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/categoryController')

router.post('/', CategoryController.create)
router.get('/', CategoryController.getAll)


module.exports = router