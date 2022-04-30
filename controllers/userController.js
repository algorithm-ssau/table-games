const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Admin, Basket} = require('../models/models')



const generateJwt = (id, email) => {
    return jwt.sign(
        {id: id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    /*async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректный email или пароль'))
        }
        const candidate = await Admin.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с такой почтой уже есть'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Admin.create({email, password: hashPassword})
        const Basket = await Basket.create({userId: user.id})
        const token = jwt.sign(
            {id: user.id, email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
            )
        return res.json({token})
    }*/

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
        const token = generateJwt(req.admin.id_admin, req.admin.email)
        return res.json({token})
    }
}

module.exports = new UserController()