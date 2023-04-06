// requires
const express = require("express");
const morgan = require("morgan");
const clients = require("./routes/clientsRoutes.js");
const products = require("./routes/productsRoutes.js");
const payChoosen = require("./routes/payRoutes.js");
const payStatus = require("./routes/payStatus.js");
const cors = require("cors");

//iniciamos el servidor
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  // https://pfhenry-jzy1.vercel.app/*
  origin: ['https://pfhenry-jzy1.vercel.app/*', 'https://pfhenry-jzy1.vercel.app/', 'https://pfhenry-production.up.railway.app/payStatus', 'https://pfhenry-jzy1-ds8p7673k-ricardo-gabriel-rouco.vercel.app', 'http://www.mercadopago.com.ar'] // Allow requests from these origins only
}));
app.use("/clients", clients);
app.use("/products", products);
app.use("/checkout", payChoosen);
app.use("/payStatus", payStatus);

//test route

app.get("/", async (req, res) => {
  res.json({ name: "hola" });
});

app.get("/prueba", async(req, res) => {
  
})

module.exports = {
  app,
};