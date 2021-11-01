var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header("Access-Controll-Allow-Origin", "*");
  res.send("User Page")
});

module.exports = router;
