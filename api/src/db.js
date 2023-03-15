//requires
require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const modelProduct = require("./models/product.js");
const modelClient = require("./models/client.js");
const admin = require('firebase-admin')
const path = require('path')
// esto es para la seccion de firebase

const serviceAccount = require(path.join(__dirname, 'pf-henry-2d98b-firebase-adminsdk-p14fk-94316ca7b8.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pf-henry-2d98b-default-rtdb.firebaseio.com"
})

// esto es para cloudinary


//instaciamos sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
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
