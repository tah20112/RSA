var express = require('express');
var router = express.Router();
var path = require("path");
var strint = require("../strint/strint");

router.get('/', (req, res, next) => {
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
});

router.post('/api/encrypt', (req, res) => {
  const message = req.body.text;
  const keys = getRSAKeys("11","13","7");
  const encrypted = encrypt(message, keys.e, keys.n);
  const decrypted = decrypt(encrypted, keys.d, keys.n);
  console.log(message,"->",encrypted,"->",decrypted);
  res.json({encrypted, decrypted});
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

function modExp(m, e, n){
  /* Computes m^e mod n */
  if (typeof m != "string" || typeof e != "string" || typeof n != "string") {
    throw "One or more arguments to modExp is not a string";
  }

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
  return total;
}

function strMod(x, y) {
  /* Returns x mod y */
  return strint.quotientRemainderPositive(x, y)[1]
}

function encrypt(m, e, n){
  /* Encrypts a message with the public key
   * m: message
   * e: public key
   * n: modulus
   */
  // TODO convert letters to numbers, currently only works for a number
  return modExp(m, e, n);
}

function decrypt(c, d, n){
  /* Decrypts an encryped message with the private key
   * c: encrypted message
   * d: private key
   * n: modulus
   */
  return modExp(c, d, n);
}

function inverse(a, n) {
  /* Finds the modular multiplicative inverse of a with respect to n
   * a: string
   * n: string
   */
  let t = "0";
  let newt = "1";
  let r = n;
  let newr = a;
  while (!strint.eq(newr,"0")) {
    const quotient = strint.div(r, newr);
    const temp1 = t;
    t = newt;
    newt = strint.sub(temp1, strint.mul(quotient, newt));
    const temp2 = r;
    r = newr;
    newr = strint.sub(temp2, strint.mul(quotient, newr));
  }
  if (strint.gt(r, "1")) {
    throw "a is not invertible";
  }
  if (strint.lt(t, "0")) {
    t = strint.add(t, n);
  }
  return t;
}

function getRSAKeys(p, q, e) {
  /* Generates an object with the relavent info to perform RSA
   * p: first prime
   * q: second prime
   * e: public key
   * Returns: {
   *   e: public key
   *   d: private key
   *   n: modulus
   * }
   */
  const n = strint.mul(p,q);

  // Check that public key is not a divisor of phiN
  const phiN = strint.mul(strint.sub(p,"1"), strint.sub(q,"1"));
  if (strMod(phiN, e) === "0") {
    throw "Error: public key is a divisor of phiN";
  }

  // Find private key using Extended Euclidean Algorithm
  const d = inverse(e, phiN);

  return {e, d, n};
}

function testRSA() {
  const keys = getRSAKeys("11","13","7");

  const message = "44";
  const c = encrypt(message, keys.e, keys.n);
  const decrypted = decrypt(c, keys.d, keys.n);
  console.log(message,"->",c,"->",decrypted);
}

testRSA();

module.exports = router;
