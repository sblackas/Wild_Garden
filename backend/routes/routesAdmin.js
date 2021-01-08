const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken');
const config = require('../modules/config');

router.post('/admin/sign-up', function (req, res) {
    const password = req.body.password;
    let hashpassword = bcrypt.hashSync(password, saltRounds)
    let newAdmin = `INSERT INTO admin (a_name, a_lastname, a_email, a_password) VALUES ('${req.body.name}','${req.body.lastname}','${req.body.email}', '${hashpassword}')`; 
    db.query(newAdmin, function (err, result) {
        if (err) throw err;
        console.log("one admin inserted");
        res.send(result)

    });

});



module.exports = router;