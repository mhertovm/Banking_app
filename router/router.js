const express = require('express');
const router = express.Router();
const controllers_public = require("../controllers/controllers_public");
const controllers_user = require("../controllers/controllers_user");

router.post("/register", controllers_public.register);
router.post("/login", controllers_public.login);

router.post("/plussum", controllers_user.plusSum);
router.post("/transfer", controllers_user.transfer);
router.post("/user", controllers_user.user);
router.post("/carts", controllers_user.carts);

module.exports = router;