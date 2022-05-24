const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Admin,Buyer, Basket} = require('../models/models')
const sequelize = require("../db");
const {QueryTypes} = require("sequelize");



const generateJwt = (id, email) => {
    return jwt.sign(
        {id: id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{


    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректный email или пароль'))
        }
        const candidate = await Buyer.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с такой почтой уже есть'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Buyer.create({email, password: hashPassword})

        const token = generateJwt(user.id_buyer, user.email)
        return res.json({token})
    }

    async loginShop(req,res,next){
        const {email, password} = req.body
        const user = await Buyer.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id_buyer, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const admin = await Admin.findOne({where: {email}})
        if (!admin){
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, admin.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(admin.id_admin, admin.email)
        return res.json({token})
    }


    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
    async checkBuyer(req,res){
        console.log(req.user.id)
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

    async pushBasket(req, res,next){

        try {
            const {productIdProduct, buyerIdBuyer, products_count, price} = req.body
            const item = await Basket.findOne({where: {productIdProduct: productIdProduct, buyerIdBuyer: buyerIdBuyer} })
            if(item){
                console.log(20)
            }
            else{
                const basket = await Basket.create({productIdProduct, buyerIdBuyer, products_count, price})
                return res.json(basket)
            }

        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getBasket(req,res){
        const {buyerIdBuyer} = req.query
        const basket = await Basket.findAll({where: {buyerIdBuyer}})
        return res.json(basket)
    }

    async deleteBasket(req,res){
        const {buyerIdBuyer, productIdProduct} = req.query

        await sequelize.query(
            'DELETE FROM baskets WHERE "productIdProduct" = $1 AND "buyerIdBuyer" = $2',
            {bind: [productIdProduct, buyerIdBuyer], type:QueryTypes.DELETE},
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
    async updateBasket(req,res){
        let {productIdProduct, buyerIdBuyer, products_count} = req.body
        await sequelize.query(
            'UPDATE public.baskets SET products_count = $1 WHERE "productIdProduct" = $2 AND "buyerIdBuyer" = $3',
            {bind: [products_count,productIdProduct, buyerIdBuyer],type:QueryTypes.UPDATE},

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
}

module.exports = new UserController()