const express = require('express');
const router = express.Router();
const db = require('../database/db');
const middlewares = require('../middlewares/middlewares.js');
const cors = require('cors');



//____Ajouter une oeuvre
router.use('/artwork/add', middlewares.isArtist)
router.post('/artwork/add', function (req, res) {
  console.log(req.body);
 let newArtwork = `INSERT INTO artworks (art_title, art_desc, art_picture, id_user, id_cate) VALUES ('${req.body.title}','${req.body.description}','${req.body.picture}','${req.body.id_user}', '${req.body.id_cate}')`; 
    db.query(newArtwork, function (err, result) { 
    if (err) throw err;
    console.log('one new artwork has been added');
     res.send(result);
    });
})

//____Toutes les oeuvres
router.get('/all-of-artworks', function (req, res) {
    let allArtworks = `SELECT * FROM artworks`;
    db.query(allArtworks, function (err, results) {
  
      if (err) res.send(err);
      // console.log(results);
      res.send(results)
    })
  
  })

//_____Infos d'une oeuvre
router.get('/artwork/:id_artwork', function (req, res) {
    try {
        db.query(`SELECT * FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, (err, result) => {
            if (err) throw err
            // console.log(result);
            res.json(result)
        })
    } catch (error) {
        console.log(error);
    }
})

//_____Supprimer son oeuvre
   router.delete('/delete-artwork/:id_artwork', middlewares.isArtist, function(req,res){
    try {
       let idArtworks = req.params.id_artwork

       let deleteArtwork = `DELETE FROM artworks WHERE id_artwork = '${idArtworks}'`
       db.query(deleteArtwork, function(err,resultat){
          //  console.log(resultat);
           if (err) throw err;
           console.log("Number of records deleted: " + resultat.affectedRows);
           res.status(200).send(resultat)
       })
    } catch (error) {
        res.status(400);
        
    }
  
})

//_____Modifier oeuvre
router.use('/update-artwork/:edit', middlewares.isArtist)
router.put('/update-artwork/:edit', function (req, res) {
  console.log(req.body);
  console.log(req.params.edit);
    db.query(`UPDATE artworks SET art_title = '${req.body.title}', art_desc = '${req.body.description}', art_picture = '${req.body.picture}', id_cate = '${req.body.id_cate}' WHERE id_artwork = '${req.params.edit}'` , function (error, results) {
  console.log(results);
      if (error) throw error;
   res.json('THE ARTWORK HAS BEEN UPDATED');
     });
  });

//_____Recuperer toutes les oeuvres posté par un user
router.get('/get-artwork/:id', function (req,res) {
  try {
    let artId = req.params.id
    let getUserArt = `SELECT  users.u_name, users.u_lastname, artworks.id_artwork, artworks.art_title, artworks.art_desc, artworks.art_picture, artworks.id_cate FROM users INNER JOIN artworks on users.id_user = artworks.id_user WHERE artworks.id_user = '${artId}'`
    db.query(getUserArt, function (err, resultas) {
       if (err) throw err,
       console.log(resultas);
       res.status(200).send(resultas)
    })
  } catch (error) {
    res.status(203).send(error)
  }
 })

//____Recuperer les oeuvres d'une categorie
 router.get("/artworks/filter/:id_cate", (req, res) => {
  try {
      db.query(`SELECT * FROM artworks WHERE id_cate = ${req.params.id_cate}`, function (err, resultss) {
          if (err) {
              res.status(400).send("Error")
          } else { 
              console.log(resultss)
              res.status(200).send(resultss)
          }
      })

  } catch (err) {
      console.log(err);
      res.status(400).send("Error")

  }
})

module.exports = router;
