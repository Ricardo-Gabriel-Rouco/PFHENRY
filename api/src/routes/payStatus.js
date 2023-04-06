const express = require("express");
const { payStatusHandlers } = require("../handlers/payStatusHandlers");
const router = express.Router();

router.post("/", payStatusHandlers)

module.exports = router;