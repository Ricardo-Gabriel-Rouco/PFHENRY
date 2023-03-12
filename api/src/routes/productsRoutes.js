const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ name: "hola route products" });
});

module.exports = router;
