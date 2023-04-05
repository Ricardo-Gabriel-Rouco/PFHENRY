const express = require("express");
const { failureHandlers } = require("../handlers/failureHandlers");
const router = express.Router();

router.get("/", failureHandlers)

module.exports = router;