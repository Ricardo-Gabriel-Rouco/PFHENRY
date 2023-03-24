const express = require("express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const authorRouter = require("./src/routes/author.route");

const server = express();

//Details routers for every "collection":
server.use("/author", authorRouter);



// server.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://pi-videogames-main-three.vercel.app"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

exports.server = functions.https.onRequest(server);
