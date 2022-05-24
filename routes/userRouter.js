const Router = require('express')
const express = require("express");
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')

//router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/authBuyer', authMiddleware, userController.checkBuyer)
router.post('/loginBuyer', userController.loginShop)
router.post('/registration', userController.registration)
router.post('/pushBasket', userController.pushBasket)
router.get('/getBasket', userController.getBasket)
router.delete('/delBasket', userController.deleteBasket)
router.put('/updBasket',userController.updateBasket)

module.exports = router