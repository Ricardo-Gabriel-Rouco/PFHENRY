const express = require("express");
const { payStatusHandlers } = require("../handlers/payStatusHandlers");
const router = express.Router();

router.get("/", payStatusHandlers)

module.exports = router;