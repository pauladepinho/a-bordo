var express = require("express");
var router = express.Router();

const UsersController = require("../controllers/UsersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.redirect("usuario/cadastrar");
});

router.get("/cadastrar", UsersController.create);

module.exports = router;