const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // le nombre de fois que l'on hashe le mdp
const jwt = require('jsonwebtoken');
const config = require('../modules/config');
const middlewares = require('../middlewares/middlewares.js');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
const fs = require('fs')


//____Inscription
router.use('/users/sign-up', middlewares.emailMiddleware)
router.post('/users/sign-up', function (req, res) {
  try {
    if (req.body.name.length < 1) throw 'No name'
    // le req body est tjrs rempli
    if (req.body.lastname.length < 1) throw 'No lastname'
    if (req.body.email.length < 1) throw 'No email'
    if (req.body.password.length < 1) throw 'No password'

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
router.post('/users/sign-in', function (req, res) {
  console.log(req.body.email);
  db.query(`SELECT * FROM users WHERE u_email = '${req.body.email}'`, function (err, result) {
    console.log(result.length);
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].u_password, function (err, theuser) {
        console.log(theuser);
        if (theuser) {
          let token = jwt.sign({ id: result[0].id_user, email: result[0].u_email, user: true }, config.secret, { expiresIn: 86400 });
          console.log(token);
          res.send({ auth: true, token: token, user: result[0] });
        } else {
          res.status(203).send("wrong password")
        }
      })
    } else {
      res.status(203).send("sorry we don't know this user")
    }
  });
});

//_____Liste des users
router.get('/users', function (req, res) {
  try {
  let allUsers = `SELECT * FROM users`;
  db.query(allUsers, function (err, todoUser) {
    if (err) res.send(err);
    // console.log(todoUser);
    res.send(todoUser)
  })
  } catch (error) {
    console.log(error);
  }
})

//_____Infos d'un user
router.get('/users/:id_user', function (req, res) {
  try {
    db.query(`SELECT * FROM users WHERE id_user = '${req.params.id_user}'`, (err, result) => {
      if (err) throw err
      // console.log(result);
      //  const photo = fs.readFileSync(`./uploads/${result[0].u_pp}`)
      //  console.log(photo);
      //  result[0].photo = photo
      res.json(result)

    })
  } catch (error) {
    console.log(error);
  }
})

//_____Supprimer d'un user
router.use('/users/:id_user', middlewares.isAuthentified)
router.delete('/users/:id_user', function (req, res) {
  // console.log(req.body);
  db.query(`DELETE FROM users WHERE id_user = '${req.params.id_user}'`, function (error, results) {
    if (error) throw error;
    res.send('User has been deleted!');
  });
});

//_____Modifier infos user
router.use('/users/:edit', middlewares.isAuthentified)
router.put('/users/:edit', function (req, res) {
  // console.log('-------------------------------------------------------------------');
  // console.log(req.body);
  // console.log('-------------------------------------------------------------------');
  db.query(`UPDATE users SET u_name = '${req.body.name}', u_lastname = '${req.body.lastname}', u_email = '${req.body.email}', u_pp = '${req.body.pp}' WHERE id_user = '${req.params.edit}'`, function (error, results) {
    if (error) throw error;
    res.send("PROFILE HAS BEEN UPDATED");
  });
});

//Uploader et mettre à jour sa photo de profil
router.post('/single/:id_user', upload.single('profile'), function (req, res, next) {
  try {
    console.log(req.body);
    console.log(req.file);
    let fileType = req.file.mimetype.split('/')[1];
    let newFileName = req.file.filename + "." + fileType;
    fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, function () {
      console.log("callback");
    });
    db.query(`UPDATE users SET u_pp = '${newFileName}' WHERE id_user = '${req.params.id_user}' `, function (err, result) {
      if (err) throw err;
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
  }
})



module.exports = router;