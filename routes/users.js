var express = require("express");
var router = express.Router();

const UsersController = require("../controllers/UsersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", UsersController.create);

router.get('/daily-of-class', (req, res) => {
  res.render('daily');
});

module.exports = router;
