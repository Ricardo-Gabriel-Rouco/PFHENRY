// requires
const express = require("express");
const morgan = require("morgan");
const clients = require("./routes/clientsRoutes.js");
const products = require("./routes/productsRoutes.js");
const payChoosen = require("./routes/payRoutes.js");
const payStatus = require("./routes/payStatus.js");
const mailRoute = require('./routes/mailRoute.js');
const cors = require("cors");

//iniciamos el servidor
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'https://pfhenry-jzy1.vercel.app', 'https://pfhenry-production.up.railway.app/payStatus', 'https://pfhenry-jzy1-ds8p7673k-ricardo-gabriel-rouco.vercel.app', 'http://www.mercadopago.com.ar'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });
// app.use(cors({
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//   origin: ['http://localhost:3000', 'https://pfhenry-jzy1.vercel.app', 'https://pfhenry-production.up.railway.app/payStatus', 'https://pfhenry-jzy1-ds8p7673k-ricardo-gabriel-rouco.vercel.app', 'http://www.mercadopago.com.ar'] // Allow requests from these origins only
// }));
// app.use(cors({
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//   origin: ['http://localhost:3000', 'https://pfhenry-jzy1.vercel.app', 'https://pfhenry-production.up.railway.app/payStatus', 'https://pfhenry-jzy1-ds8p7673k-ricardo-gabriel-rouco.vercel.app', 'http://www.mercadopago.com.ar'], // Allow requests from these origins only
//   credentials: true, // Permitir solicitudes con credenciales (como cookies o encabezados de autorización)
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Permitir los encabezados personalizados Origin, X-Requested-With, Content-Type y Accept
// }));
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://pfhenry-jzy1.vercel.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
//   credentials: true,
//   preflightContinue: true, // Permitir que se continúe la solicitud preflight OPTIONS
// }));

// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'https://pfhenry-jzy1.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.send();
// });

app.use((req, res, next) => {
  //set header first to allow request or origin domain (value can be different)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

//---- other code

//Preflight CORS handler
  if(req.method === 'OPTIONS') {
      return res.status(200).json(({
          body: "OK"
      }))
  }
  next()
})

app.use("/clients", clients);
app.use("/products", products);
app.use("/checkout", payChoosen);
app.use("/payStatus", payStatus);   //esta ruta queda en standBy por el momento
app.use("/mail", mailRoute)


//test route

app.get("/", async (req, res) => {
  res.json({ name: "hola" });
});

app.get("/prueba", async (req, res) => {

})

module.exports = {
  app,
};