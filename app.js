const express = require('express')
const path = require('path');
const app = express()
const BigInteger = require('jsbn').BigInteger;
const { PerformanceObserver, performance } = require('perf_hooks');
let bi = function (n, b) { return new BigInteger(n.toString(), b ? b : 10); };

//sunRadius in Km = 695.510
const sunRadiusTimes2 = bi('695.510').multiply(bi(2))


app.get('/calculateNextDecimalPrecision', function (req, res) {
    nextDecimalPrecision(function (pi) {
        res.send(pi)
    })
})


let  sunCircumference =function (pi,sunRadiusTimes2,cb) {

    return cb(bi(pi).multiply(sunRadiusTimes2).toString())
    
} 
app.get('/sunCircumference', function (req, res) {
    sunCircumference(pi,sunRadiusTimes2,function (circumference) {
        res.send(circumference)
    })
})




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    let passPi =""
    if (pi == "")
        passPi="3.14"
    else
         passPi = pi
     sunCircumference(passPi,sunRadiusTimes2,function (circumference) {
        res.render("index", {
            pi: passPi,
            sunCircumference: circumference.replace(/^4/,'4.')
    
        });
    })

});

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

app.listen(3000)

//test before add callback
// let t0 = performance.now();
// for (let index = 0; index < 10000; index++) {
//     calcPi()
// }
// let t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
// console.log(pi)