var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get("/chamada", (req, res) => {
  res.render("attendance");
});

module.exports = router;
