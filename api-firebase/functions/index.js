const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/books", (req, res) => {
  res.status(200).json({ message: "Hola Firebase" });
});

exports.app = functions.https.onRequest(app);
