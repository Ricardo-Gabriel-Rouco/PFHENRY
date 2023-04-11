const express = require("express");
const { sendingEmail } = require("../handlers/mailHandler");
const router = express.Router();

router.post("/", sendingEmail)

module.exports = router;