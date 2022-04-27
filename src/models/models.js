const sequelize = require('../../db')
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
    game_time: {type: DataTypes.INTEGER},
    age_rating: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    little_description: {type: DataTypes.STRING},
    players_number: {type: DataTypes.INTEGER},
    little_picture: {type: DataTypes.STRING},
    pravila_link: {type: DataTypes.STRING},
    mas_pictures: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER}
})

const Basket = sequelize.define('basket', {
    products_count: {type: DataTypes.INTEGER}
})

const Buyer = sequelize.define('buyer', {
    id_buyer: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

Products.hasOne(Categories)
Categories.belongsTo(Products)

Basket.hasMany(Products)
Products.belongsTo(Basket)

Basket.hasOne(Buyer)
Buyer.belongsTo(Basket)

module.exports = {
    Admin,
    Categories,
    Products,
    Basket,
    Buyer
}
