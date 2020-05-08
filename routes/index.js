var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


router.get("/cadastrar", (req, res) => {
  req.query.usuario == "professor" ? res.render("register-teacher") : res.render("register-guardian");
})

router.get("/fazer-chamada", (req, res) => {
  res.render("attendance");
});

router.get('/lancar-notas', (req, res) => {
  res.render('set-notes');
});

router.get('/ver-diario-de-classe', (req, res) => {
  res.render('daily');
});

module.exports = router;
