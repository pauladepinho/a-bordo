var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
  res.render('create');
});

router.get('/daily-of-class', (req, res) => {
  res.render('daily');
});

module.exports = router;
