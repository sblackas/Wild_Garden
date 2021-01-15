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

router.put('/artwork/:edit', function (req, res) {
    db.query(`UPDATE artworks SET art_title = '${req.body.name}', art_desc = '${req.body.description}', art_picture = '${req.body.picture}' WHERE id_artwork = '${req.params.edit}'` , function (error, results) {
  if (error) throw error;
   res.json('THE ARTWORK HAS BEEN UPDATED');
     });
  });

module.exports = router;
