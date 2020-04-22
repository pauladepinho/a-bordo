var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get("/chamada", (req, res) => {
  res.render("attendance");
});

router.get('/lancarnotas', function (req, res) {
  res.render('set-notes');
});

module.exports = router;
