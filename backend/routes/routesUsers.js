const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // le nombre de fois que l'on hashe le mdp
const jwt = require('jsonwebtoken');
const config = require('../modules/config');



router.post('/users/sign-up', function (req, res) {
    const password = req.body.password;
    let hashpassword = bcrypt.hashSync(password, saltRounds)
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(hashpassword);
    console.log(req.body.lastname);

    let newUser = `INSERT INTO users (u_name, u_lastname, u_email, u_password, u_pp) VALUES ('${req.body.name}','${req.body.lastname}','${req.body.email}', '${hashpassword}', '${req.body.pp}')`; 
    db.query(newUser, function (err, result) { // envoyer mon newUser dans ma database
        if (err) throw err;
        console.log("one user inserted");
        res.send(result)

    });

});

router.post('/users/sign-in', function(req, res) {
    // let email = req.body.email
    // let password = req.body.password

     db.query(`SELECT * FROM users WHERE u_email = '${req.body.email}'`, function (err, result) { // *=tout
        if (err) throw err;
        if (result.length) {
            bcrypt.compare(req.body.password, result[0].u_password, function(err,theuser){
              console.log(theuser);
              if(theuser) {
                let token = jwt.sign({ id: result[0].id_user, name: result[0].u_name }, config.secret, { expiresIn: 86400 });
                console.log(token);
                res.send({ auth: true, token: token, user: result[0] }); 
              } else {
                res.status(400).send("wrong password") 
              }
          })
  
          } else {
            res.status(400).send("sorry we don't know this user") 
          }
          
        });
  
    });


    router.get('/users', function (req,res) {
        let allUsers = `SELECT id_user,u_name FROM users`;
        db.query(allUsers, function (err, todoUser) {
     
          if (err) res.send (err);
              console.log(todoUser);
              res.send(todoUser)
        })
        
      })


      router.get('/users/:id_user', function (req, res) {
        try {
            db.query(`SELECT u_name, u_lastname, u_email, u_pp FROM users WHERE id_user = '${req.params.id_user}'`, (err, result) => {
                if (err) throw err
                console.log(result);
                res.json(result)

            })
        } catch (error) {
            console.log(error);
        }
    })
    

module.exports = router;