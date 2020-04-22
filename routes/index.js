var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get("/fazer-chamada", (req, res) => {
  res.render("attendance");
});

router.get('/lancar-notas', function (req, res) {
  res.render('set-notes');
});

router.get('/ver-diario-de-classe', (req, res) => {
  res.render('daily');
});

module.exports = router;
