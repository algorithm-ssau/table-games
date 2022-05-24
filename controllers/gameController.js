const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require("../db");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {QueryTypes} = require("sequelize");

class GameController {
    async create(req, res,next) {
        try {
        let {game_name,game_time,age_rating,description,little_description,players_number,little_picture,rool_link,mas_pictures,price,popular ,categoryIdCategories} = req.body

        const game = await Products.create({game_name, game_time, age_rating, description, little_description, players_number, little_picture, rool_link, price, mas_pictures,popular ,categoryIdCategories})
        return res.json(game)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async updateGame(req,res){
        const id_product = parseInt(req.params.id)

        let {game_name,game_time,age_rating,description,little_description,players_number,little_picture,rool_link,mas_pictures,price,popular ,categoryIdCategories} = req.body
        await sequelize.query(
            'UPDATE public.products SET game_name = $1, game_time = $2, age_rating = $3, description = $4, little_description = $5, players_number = $6, little_picture = $7, rool_link = $8, mas_pictures = $9, price = $10, popular=$11, "categoryIdCategories" = $12 WHERE id_product = $13',
            {bind: [game_name,game_time,age_rating,description,little_description,players_number,little_picture,rool_link,mas_pictures,price,popular ,parseInt(categoryIdCategories),id_product],type:QueryTypes.UPDATE},

            (error, results) =>
            {
                if(error){
                    throw error
                }
                res.status(200).send('Update')
            }
        )
        return res.json('Updated')

    }
    async deleteGame(req,res){
        const id_product = parseInt(req.params.id)

        await sequelize.query(
            'DELETE FROM products WHERE id_product = $1',
            {bind: [id_product], type:QueryTypes.DELETE},
            (error, results) =>
            {
                if(error){
                    throw error
                }
                res.status(200).send('Deleted')
            }
        )
        return res.json('Deleted')


    }
    async getAll(req, res) {

        let {categoryIdCategories, limit, page} = req.query
        page = page || 1
        limit = limit || 16
        let offset = page * limit - limit
        let game;
        if(!categoryIdCategories){
            game = await Products.findAndCountAll({limit,offset})
        }
        if(categoryIdCategories){
            game = await Products.findAndCountAll({where: {categoryIdCategories},limit,offset})
        }
        return res.json(game)
    }
    async getOne(req, res){

        const id_product = req.params.id
        const game = await Products.findOne(
            {
                where:{id_product}
            }
        )
        return res.json(game)
    }
    async getAllGames(req, res){
        let game;
        game = await Products.findAndCountAll();
        return res.json(game);
    }
    async getPopularGames(req,res){
        const popular = true;
        let {limit,page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let game;
        game = await Products.findAndCountAll({where: {popular}, limit, offset})
        return res.json(game)

    }
    async getNewsGames(req,res){
        let game;
        let {limit,page} = req.query
        page = page || 1
        limit = limit || 4
        let offset = page * limit - limit
        game = await Products.findAndCountAll({order: [['createdAt', 'DESC']], limit, offset})

        return res.json(game)

    }
    async searchGame(req, res){

        let {search, limit} = req.query
        const game = await Products.findAndCountAll({where:{game_name:{[Op.iRegexp]: search },},limit});
        return res.json(game)


    }

}



module.exports = new GameController()