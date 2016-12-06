var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/', (req, res, next) => {
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
});

router.post('/api/encrypt', (req, res) => {
  const message = req.body.text;
  let encrypted = "";
  for (var i=0; i<message.length; i++) {
    const num = message.charCodeAt(i) - 97;
    const encryptedNum = (num + 1) % 26;
    encrypted += String.fromCharCode(encryptedNum + 97);
  }
  res.json({text:encrypted});
})

module.exports = router;
