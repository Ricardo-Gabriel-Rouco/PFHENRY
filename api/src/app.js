// requires
const express = require("express");
const morgan = require("morgan");
const clients = require("./routes/clientsRoutes.js");
const products = require("./routes/productsRoutes.js");
const payChoosen = require("./routes/payRoutes.js");
const payFailure = require("./routes/payFailure.js");
const paySuccess = require("./routes/paySuccess.js");
const cors = require("cors");

//iniciamos el servidor
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: ['https://pfhenry-jzy1.vercel.app/*', 'http://www.mercadopago.com.ar'] // Allow requests from these origins only
}));
app.use("/clients", clients);
app.use("/products", products);
app.use("/checkout", payChoosen);
app.use("/paySuccess", paySuccess);
// app.use("/checkout/failure", payFailure);

//test route

app.get("/", async (req, res) => {
  res.json({ name: "hola" });
});

app.get("/prueba", async(req, res) => {
  
})

module.exports = {
  app,
};