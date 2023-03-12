//requires
require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const modelProduct = require("./models/product.js");
const modelClient = require("./models/client.js");

//instaciamos sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/store`, {
  timestamps: false,
  logging: false,
});

modelProduct(sequelize);
modelClient(sequelize);

const { Product, Client } = sequelize.models;

Product.belongsToMany(Client, { through: "ProductsxClients" });
Client.belongsToMany(Product, { through: "ProductsxClients" });

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
