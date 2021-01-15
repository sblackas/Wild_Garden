const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.post('/artwork/add', function (req, res) {
 let newArtwork = `INSERT INTO artworks (art_title, art_desc, art_picture) VALUES ('${req.body.name}','${req.body.description}','${req.body.picture}')`; 
    db.query(newArtwork, function (err, result) { 
    if (err) throw err;
     res.send(result);
    });
})

router.delete('/artwork/:id_artwork', function (req, res) {
    console.log(req.body);
    db.query(`DELETE FROM artworks WHERE id_artwork = '${req.params.id_artwork}'`, function (error, results) {
       if (error) throw error;
           res.send('Artwork has been deleted!');
         });
   });

module.exports = router;
