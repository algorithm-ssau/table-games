const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
    id_admin: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING}
})

const Categories = sequelize.define('categories', {
    id_categories: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_category: {type: DataTypes.STRING, unique: true}
})

const Products = sequelize.define('products', {
    id_product: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    game_name: {type: DataTypes.STRING},
    game_time: {type: DataTypes.STRING},
    age_rating: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    little_description: {type: DataTypes.STRING},
    players_number: {type: DataTypes.STRING},
    little_picture: {type: DataTypes.TEXT},
    rool_link: {type: DataTypes.TEXT},
    mas_pictures: {type: DataTypes.TEXT},
    price: {type: DataTypes.INTEGER},
    popular: {type: DataTypes.BOOLEAN},
})

const Basket = sequelize.define('basket', {
    products_count: {type: DataTypes.INTEGER}
})

const Buyer = sequelize.define('buyer', {
    id_buyer: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

Categories.hasMany(Products)
Products.belongsTo(Categories)

Products.hasMany(Basket)
Basket.belongsTo(Products)

Buyer.hasMany(Basket)
Basket.belongsTo(Buyer)

module.exports = {
    Admin,
    Categories,
    Products,
    Basket,
    Buyer
}
