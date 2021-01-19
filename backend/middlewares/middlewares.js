const jwt = require("jsonwebtoken")
const config = require('../modules/config');
const db = require('../database/db');

//____Check if token is valid
const authJWT = (req, res, next) => {

    let token = req.headers.token
    console.log(req.headers);
    jwt.verify(token, config.secret, (err, decoded) => {

        if (decoded) {
            next()
        } else {
            res.status(403).send("Invalid token")
        }
    })


}

//____Check if logged one is admin 
const isAdmin = (req, res, next) => {
     let token = req.headers.token
    jwt.verify(token, config.secret, (err, decoded) => {

        if (decoded) {
            next()
        } else {
            res.status(403).send("your are not the admin")
        }
    })


}

//____Check if logged one is artist
const isArtist = (req, res, next) => {
     let token = req.headers.token
    jwt.verify(token, config.secret, (err, decoded) => {

        if (decoded) {
            next()
        } else {
            res.status(403).send("your are not an artist")
        }
    })


}

//____Can't register the same email twice
const emailMiddleware = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE u_email ='${req.body.email}'`, async function (err, results) {
        if (results.length) {
            console.log('err email already exist')
            res.status(400).send("Email already exists")
        } else {
            next()
        }
    })
}

module.exports = { authJWT, emailMiddleware, isAdmin, isArtist }

