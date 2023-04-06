const express = require("express");
const { preferencePayHandler } = require("../handlers/payHandlers");
const router = express.Router();

router.post("/", preferencePayHandler);

module.exports = router;