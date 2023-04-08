const express = require("express");
const { sendingEmail } = require("../handlers/mailHandler");
const router = express.Router();

router.get("/", sendingEmail)

module.exports = router;