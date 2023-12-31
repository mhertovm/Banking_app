const express = require('express');
const router = express.Router();
const controllers_public = require("../controllers/controllers_public");
const controllers_user = require("../controllers/controllers_user");
const {authenticateToken} = require("../middleware/authenticateToken")

router.post("/register", controllers_public.register);
router.post("/login", controllers_public.login);

router.post("/plussum", authenticateToken, controllers_user.plusSum);
router.post("/transfer", authenticateToken, controllers_user.transfer);
router.post("/user", authenticateToken, controllers_user.user);
router.post("/cards", authenticateToken, controllers_user.cards);
router.post("/transfers", authenticateToken, controllers_user.transfers);
router.post("/addcard", authenticateToken, controllers_user.addCard);

module.exports = router;