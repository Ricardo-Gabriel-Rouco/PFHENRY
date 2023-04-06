const express = require("express");
const { successHandlers } = require("../handlers/successHandlers");
const router = express.Router();

router.post("/", successHandlers)

module.exports = router;