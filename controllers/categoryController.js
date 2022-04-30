const {Categories} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res) {
        const {name_category} = req.body
        const category = await Categories.create({name_category})
        return res.json(category)
    }

    async getAll(req, res) {
        const category = await Categories.findAll()
        return res.json(category)
    }

}

module.exports = new CategoryController()