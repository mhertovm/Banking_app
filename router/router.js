const express = require('express');
const router = express.Router();
const controllers_public = require("../controllers/controllers_public")

router.post("/register", controllers_public.register);
router.post("/login", controllers_public.login);

module.exports = router;