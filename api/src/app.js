// requires
const express = require("express");
const morgan = require("morgan");
const clients = require("./routes/clientsRoutes.js");
const products = require("./routes/productsRoutes.js");
const payChoosen = require("./routes/payRoutes.js");
const cors = require("cors");

//iniciamos el servidor
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin only
}));
app.use("/clients", clients);
app.use("/products", products);
app.use("/checkout", payChoosen);

//test route

app.get("/", async (req, res) => {
  res.json({ name: "hola" });
});

app.get("/prueba", async(req, res) => {
  
})

module.exports = {
  app,
};