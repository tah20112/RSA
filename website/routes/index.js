var express = require('express');
var router = express.Router();
var path = require("path");
var strint = require("../strint/strint");

let keys = {};

router.get('/', (req, res, next) => {
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
});

router.post('/api/getKeys', (req, res) => {
  keys = getRSAKeys(req.body.prime1.toString(), req.body.prime2.toString(), req.body.publicKey.toString());
  res.json({keys});
});

router.post('/api/encrypt', (req, res) => {
  const message = req.body.message.toString();
  const encrypted = encrypt(message, keys.e, keys.n);
  res.json({encrypted});
});

router.post('/api/decrypt', (req, res) => {
  const decrypted = decrypt(req.body.encrypted, keys.d, keys.n);
  res.json({decrypted});
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
  return modExp(a,p,p) === a;
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

function t2d(message){
  let uni = 0;
  let numOut = "";
  for (let i = 0; i<message.length; i++){
    uni = (message[i].charCodeAt() >>> 0).toString(2);
    var keep = uni.length;
    for (let j = 0; j<(8-keep);j++){
      uni = "0" + uni;
    }
    numOut = numOut + uni;
  }
  return strint.binToDec(numOut);
}

function d2t(value){
  let currByte = "";
  let message = "";
  let binarE = strint.decToBin(value);
  while (binarE){
    currByte = binarE.slice(0,8);
    currByte = strint.binToDec(currByte);
    binarE = binarE.slice(8); 
    message = message + String.fromCharCode(parseInt(currByte));
  }
  return message;
}

console.log(d2t(t2d("Message Received")));

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

module.exports = router;
