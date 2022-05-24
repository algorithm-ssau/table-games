const Router = require('express')
const express = require("express");
const router = express.Router()
const GameController = require('../controllers/gameController')

router.post('/', GameController.create)
router.get('/', GameController.getAll)
router.get('/All', GameController.getAllGames)
router.get('/Popular', GameController.getPopularGames)
router.get('/News', GameController.getNewsGames)
router.get('/Search', GameController.searchGame)
router.get('/:id', GameController.getOne)
router.put('/:id', GameController.updateGame)
router.delete('/:id', GameController.deleteGame)

module.exports = router