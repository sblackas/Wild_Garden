const express = require('express');
const router = express.Router();
const db = require('../database/db');
const middlewares = require('../middlewares/middlewares.js');


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
    let allArtworks = `SELECT id_artwork, art_title, art_desc, art_picture FROM artworks`;
    db.query(allArtworks, function (err, results) {
  
      if (err) res.send(err);
      // console.log(results);
      res.send(results)
    })
  
  })

//_____Infos d'une oeuvre
router.get('/artwork/:id_artwork', function (req, res) {
    try {
        db.query(`SELECT art_title, art_desc, art_picture FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, (err, result) => {
            if (err) throw err
            // console.log(result);
            res.json(result)

        })
    } catch (error) {
        console.log(error);
    }
})

//_____Supprimer son oeuvre
// router.use('/delete-artwork/:id_artwork', middlewares.isArtist)
// router.delete('/delete-artwork/:id_artwork', function (req, res) {
//     console.log(req.body);
//     db.query(`DELETE FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, function (error, results) {
//        if (error) throw error;
//            res.send('Artwork has been deleted!');
//          });
//    });

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
    db.query(`UPDATE artworks SET art_title = '${req.body.name}', art_desc = '${req.body.description}', art_picture = '${req.body.picture}' WHERE id_artwork = '${req.params.edit}'` , function (error, results) {
  if (error) throw error;
   res.json('THE ARTWORK HAS BEEN UPDATED');
     });
  });

//_____Recuperer toutes les oeuvres posté par un user
 
router.get('/get-artwork/:id', function (req,res) {
  try {
    let artId = req.params.id
    let getUserArt = `SELECT  users.u_name, users.u_lastname, artworks.id_artwork, artworks.art_title, artworks.art_desc, artworks.art_picture FROM users INNER JOIN artworks on users.id_user = artworks.id_user WHERE artworks.id_user = '${artId}'`
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
router.get('/get-cate-artworks/:id', function (req,res) {
    let artCateId = req.params.id
    let getCateArt = `SELECT  artworks.art_title, artworks.art_desc, artworks.art_picture, categories.cate_name FROM artworks INNER JOIN categories on artworks.id_artwork = categories.id_artwork WHERE id_artwork = '${artCateId}'`
    db.query(getCateArt, function (err, results) {
       if (err) throw err
       res.send(results)
    })
 })

module.exports = router;
