const express = require('express');
const router = express.Router();
const IndexController = require("../controllers/IndexController");

router.get("/", IndexController.renderLogin);
router.get("/login", IndexController.renderLogin);
router.post("/login", IndexController.login);
router.get("/cadastrar", IndexController.register);

module.exports = router;