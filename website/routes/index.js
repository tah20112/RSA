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

  var mod = modExp(a,p,p);
  if (mod === a){
    console.log("true");
    return true;
  } else{
    console.log("falsch");
    return false;
  }
}

function modExp(m,n,e){
    var total = "1";
    var curr_val = "1";
    var old_vals = {0:"1"};
    var binarE = (e >>> 0).toString(2);
    var counter = 1;
    var iter = binarE.length;

    old_vals[1] = strMod(m,n);
     
    for (j = 0; j<iter; j++){
        curr_val = strMod(strint.mul(old_vals[counter],old_vals[counter]),n);
        if (binarE.slice(-1) === "1"){
            total = strint.mul(total, old_vals[counter]); 
        }
        counter = counter*2;
        old_vals[counter] = curr_val;
        binarE = binarE.slice(0,-1);
    }
    total = strMod(total, n);
    console.log(old_vals);
    return total;
}

function strMod(x, y) {
  /* Returns x mod y */
  return strint.quotientRemainderPositive(x, y)[1]
}

function encrypt(message, e, n){
    return 0;
}

function decrypt(d, n){
    var mess = "No message";
    return mess;
}

lilFermat("53","40961");
lilFermat("811","40961");
lilFermat("247","40961");
lilFermat("170","40961");
lilFermat("3","179426549");

module.exports = router;
