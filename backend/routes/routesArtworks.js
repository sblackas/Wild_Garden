const express = require('express');
const router = express.Router();
const db = require('../database/db');

//______Ajouter une oeuvre
router.post('/artwork/add', function (req, res) {
 let newArtwork = `INSERT INTO artworks (art_title, art_desc, art_picture) VALUES ('${req.body.name}','${req.body.description}','${req.body.picture}')`; 
    db.query(newArtwork, function (err, result) { 
    if (err) throw err;
     res.send(result);
    });
})

//______Recuperer toutes les infos concernant une oeuvre
router.get('/artwork/:id_artwork', function (req, res) {
    try {
        db.query(`SELECT art_title, art_desc, art_picture FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, (err, result) => {
            if (err) throw err
            console.log(result);
            res.json(result)

        })
    } catch (error) {
        console.log(error);
    }
})

//_____Supprimer une oeuvre
router.delete('/artwork/:id_artwork', function (req, res) {
    console.log(req.body);
    db.query(`DELETE FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, function (error, results) {
       if (error) throw error;
           res.send('Artwork has been deleted!');
         });
   });

//______Pouvoir modifier son oeuvre   
router.put('/artwork/:edit', function (req, res) {
    db.query(`UPDATE artworks SET art_title = '${req.body.name}', art_desc = '${req.body.description}', art_picture = '${req.body.picture}' WHERE id_artwork = '${req.params.edit}'` , function (error, results) {
  if (error) throw error;
   res.json('THE ARTWORK HAS BEEN UPDATED');
     });
  });

//_______Recuperer toutes les oeuvres poster par un user
  router.get('/get-artworks/:id', function (req,res) {
    let userId = req.params.id
    let getArtworks = `SELECT  users.u_name, users.u_lastname, artworks.art_title, artworks.art_desc, artworks.picture FROM users INNER JOIN artworks on users.id_user = artworks.id_user WHERE id_user = '${userId}'`
    db.query(getArtworks, function (err, results) {
       if (err) throw err,
       res.send(results)
    })
 })

module.exports = router;
