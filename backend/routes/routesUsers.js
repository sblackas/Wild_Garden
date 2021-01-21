const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // le nombre de fois que l'on hashe le mdp
const jwt = require('jsonwebtoken');
const config = require('../modules/config');
const middlewares = require('../middlewares/middlewares.js');


//____Inscription
router.post('/users/sign-up', function (req, res) {
    try {
      if (req.body.name.length < 1) throw'No name'
      // le req body est tjrs rempli
      if (req.body.lastname.length < 1) throw'No lastname'
      if (req.body.email.length < 1) throw'No email'
      if (req.body.password.length < 1) throw'No password'

  const password = req.body.password;
    let hashpassword = bcrypt.hashSync(password, saltRounds)
    // console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(hashpassword);
    console.log(req.body.lastname);
let userObject = [req.body.name, req.body.lastname, req.body.email, hashpassword, req.body.pp]
    // let newUser = `INSERT INTO users (u_name, u_lastname, u_email, u_password, u_pp) VALUES ('${req.body.name}','${req.body.lastname}','${req.body.email}', '${hashpassword}', '${req.body.pp}')`; 
    let newUser = `INSERT INTO users (u_name, u_lastname, u_email, u_password, u_pp) VALUES (?, ?, ?, ?, ?)`
    db.query(newUser, userObject, function (err, result) { // envoyer mon newUser dans ma database
        if (err) throw err;
        console.log("one user inserted");
        res.send(result)

    });

} catch (err) {
  res.status(203).send(err)
}

})


//_____Connexion
router.use('/users/sign-in', middlewares.authJWT)
router.post('/users/sign-in', function (req, res) {
  db.query(`SELECT * FROM users WHERE u_email = '${req.body.email}'`, function (err, result) { // *=tout
    if (err) throw err;
    if (result.length) {
      bcrypt.compare(req.body.password, result[0].u_password, function (err, theuser) {
        console.log(theuser);
        if (theuser) {
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

//_____Liste des users
router.get('/users', function (req, res) {
  let allUsers = `SELECT id_user,u_name FROM users`;
  db.query(allUsers, function (err, todoUser) {

    if (err) res.send(err);
    console.log(todoUser);
    res.send(todoUser)
  })

})

//_____Infos d'un user
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

//_____Supprimer d'un user
router.use('/users/:id_user', middlewares.isAdmin)
router.delete('/users/:id_user', function (req, res) {
  console.log(req.body);
  db.query(`DELETE FROM users WHERE id_user = '${req.params.id_user}'`, function (error, results) {
    if (error) throw error;
    res.send('User has been deleted!');
  });
});

//_____Modifier infos user
router.put('/users/:edit', function (req, res) {
  db.query(`UPDATE users SET u_name = '${req.body.name}', u_lastname = '${req.body.lastname}', u_email = '${req.body.email}', u_password = '${req.body.password}', u_pp = '${req.body.pp}' WHERE id_user = '${req.params.edit}'`, function (error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results + "PROFILE HAS BEEN UPDATED"));
    //  res.status(200).send("PROFILE HAS BEEN UPDATED");
  });
});


module.exports = router;