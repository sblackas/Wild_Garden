const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // le nombre de fois que l'on hashe le mdp
const jwt = require('jsonwebtoken');



router.post('/users/sign-up', function (req, res) {
    const password = req.body.password;
    let hashpassword = bcrypt.hashSync(password, saltRounds)
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(hashpassword);
    console.log(req.body.lastname);

    let newUser = `INSERT INTO users (u_name, u_lastname, u_email, u_password) VALUES ('${req.body.name}','${req.body.email}','${hashpassword}','${req.body.lastname}')`; 
    db.query(newUser, function (err, result) { // envoyer mon newUser dans ma database
        if (err) throw err;
        console.log("one user inserted");
        res.send(result)

    });

});



module.exports = router;