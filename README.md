# NaluriChallenge
The Naluri space project is investigating how we could model the solar system. As a first step we’d like to calculate the circumference of the sun.

pi calculation using spigot algorithm
because other algorithm like Gauss-Legendre and Chudnovsky
every iteration give many of digits and Do we need full precision from the start. Furthermore, you need extra guard digits,Although they're faster I didn't use them to achieve requiment "Everytime the server has calculated the next decimal precision"

## Install

`npm install`

## Run

1. `node app.js`
2. Open `http://localhost:3000` in a web browser displays The servers’ current known value of Pi and The circumference of the sun.

#### HTTP Methods

GET- a last calculated pi and calculate Next Decimal Precision

	app.get('/calculateNextDecimalPrecision', function (req, res) {
    nextDecimalPrecision(function (pi) {
        res.send(pi)
    })
  })
