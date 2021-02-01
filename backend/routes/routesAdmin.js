const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../modules/config');

//___ Inscription admin
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

//____Connexion admin
router.post('/admin/sign-in', function (req, res) {
  db.query(`SELECT * FROM admin WHERE a_email = '${req.body.email}'`, function (err, result) { // *=tout
    if (err) throw err;
    if (result.length) {
      bcrypt.compare(req.body.password, result[0].a_password, function (err, theadmin) {
        console.log(theadmin);
        if (theadmin) {
          let token = jwt.sign({ id: result[0].id_admin, name: result[0].a_name , admin : true}, config.secret, { expiresIn: 86400 });
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


//____Infos admin
router.get('/admin/:id_admin', function (req, res) {
  try {
    db.query(`SELECT a_name, a_lastname, a_email, a_password FROM admin WHERE id_admin = '${req.params.id_admin}'`, (err, result) => {
      if (err) throw err
      console.log(result);
      res.json(result)

    })
  } catch (error) {
    console.log(error);
  }
})

//____Suppression admin
router.delete('/admin/:id_admin', function (req, res) {
  console.log(req.body);
  db.query(`DELETE FROM admin WHERE id_admin = '${req.params.id_admin}'`, function (error, results) {
    if (error) throw error;
    res.send('Admin has been deleted!');
  });
});


//_____Modifier admin
router.put('/admin/:edit', function (req, res) {
  db.query(`UPDATE admin SET a_name = '${req.body.name}', a_lastname = '${req.body.lastname}', a_email = '${req.body.email}' WHERE id_admin = '${req.params.edit}'`, function (error, results) {
    if (error) throw error;
    //  res.send(JSON.stringify(results + "PROFILE HAS BEEN UPDATED"));
    res.send('PROFILE HAS BEEN UPDATED');

  });
});

module.exports = router;