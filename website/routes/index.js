var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/', function(req, res, next) {
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
});

router.post('/api/encrypt', function(req, res) {
  res.json(req.body);
})

module.exports = router;
