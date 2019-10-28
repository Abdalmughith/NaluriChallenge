const express = require('express')

const app = express()
const BigInteger = require('jsbn').BigInteger;
const { PerformanceObserver, performance } = require('perf_hooks');

app.get('/', function (req, res) {
    nextDecimalPrecision(function (pi) {
        res.send(pi)
    })
})
app.listen(3000)

let bi = function (n, b) { return new BigInteger(n.toString(), b ? b : 10); };
let pi = ""
let q = bi(1), r = bi(0), t = bi(1), k = bi(1), n = bi(3), l = bi(3);
let one = bi(1), two = bi(2), three = bi(3), four = bi(4), seven = bi(7), ten = bi(10);
let nr = bi(1), nn = bi(1);



function nextDecimalPrecision(callBack) {
    while (true) {
        if (q.multiply(four).add(r).subtract(t).compareTo(n.multiply(t)) < 0) {
           if(pi=="")
                pi += n.toString()+"."
            else
                pi += n.toString()
            callBack(pi)
            nr = (r.subtract(n.multiply(t))).multiply(ten);
            n = (q.multiply(three).add(r)).multiply(ten).divide(t).subtract(n.multiply(ten));
            q = q.multiply(ten);
            r = nr;
            break;
        } else {
            nr = q.shiftLeft(1).add(r).multiply(l);
            nn = q.multiply(k).multiply(seven).add(two).add(r.multiply(l)).divide(t.multiply(l));
            q = q.multiply(k);
            t = t.multiply(l);
            l = l.add(two);
            k = k.add(one);
            n = nn;
            r = nr;
        }
    }
}


//test before add callback
// let t0 = performance.now();
// for (let index = 0; index < 10000; index++) {
//     calcPi()
// }
// let t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
// console.log(pi)