var express = require('express');
var router = express.Router();
var path = require("path");
var strint = require("../strint/strint");

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
  let large = strPow("3", "41");
  console.log(strMod(large, "10"));
  res.json({text:encrypted});
});

/* Our collection of functions for RSA encryption */

function bigPrime(){
  /* Using random number generation and Fermat's little
   * theorum, this function will find and output 2
   * VERY large prime numbers for our RSA key. */

}

function lilFermat(a, p){
  /* if p is prime, then a^p = a mod(p). This function will
   * return true if this equality is maintained for the given
   * values*/

  var mod = strPow(a,p) % p;
  console.log(mod);
  if (mod === a){
    console.log("true");
    return true;
  } else{
    console.log("falsch");
    return false;
  }
}

function strPow(x, y){
  var result = "1";
  for (i = 0; i < parseInt(y); i++){
    result = strint.mul(result, x);
  }
  return result;
}

var re = strPow("3","41");
console.log(re);
var verm = lilFermat("3", "41");

function strMod(x, y) {
  /* Returns x mod y */
  return strint.quotientRemainderPositive(x, y)[1]
}

module.exports = router;
