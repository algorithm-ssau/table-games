const Router = require('express')
const express = require('express')
const router = express.Router()
const gameRouter = require('./gameRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/game', gameRouter)

module.exports = router