/* Our collection of functions for RSA encryption */

var strint = require("./strint/strint");

function bigPrime(){
    /* Using random number generation and Fermat's little
     * theorum, this function will find and output 2 
     * VERY large prime numbers for our RSA key. */

}

function lilFermat(a, p){
    /* if p is prime, then a^p = a mod(p). This function will 
     * return true if this equality is maintained for the given
     * values*/
    
    var mod = strPow(a,b) % p;
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
    var result = 1;
    for (i = 0; i < y; i++){
        result = strint.mul(result, x);
    }
    console.log(result);
    return result;
}

strPow(2,3);
strPow(3,41);

lilFermat(2,7);
lilFermat(3,41);
lilFermat(6,57);
