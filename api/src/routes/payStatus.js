const express = require("express");
const { payStatusHandlers } = require("../handlers/payStatusHandlers");
const router = express.Router();

router.post("/", payStatusHandlers) //esto queda en standBy por el momento

module.exports = router;