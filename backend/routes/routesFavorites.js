const express = require('express');
const router = express.Router();
const db = require('../database/db');
const middlewares = require('../middlewares/middlewares.js');
const jwt = require("jsonwebtoken")



//____Ajouter une oeuvre aux favoris

router.post('/artwork/add-to-fav', middlewares.isAuthentified, function(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.decode(token);
        console.log(decoded);
        db.query(`INSERT INTO favorites (id_user, id_artwork)
        VALUES (?, ?)`, [
            decoded.id,
            req.body.id_artwork,
        ]);       
        res.json({
            message: 'a bien été ajouté aux favoris'
        });
    } catch (e) {
        res.status(401).json({ error: e.message }); // ceci est une syntaxe typique de catch error grace a la codification du satut 401
    }
});

//_______Récuperer les favoris
router.get('/get-favs/', middlewares.isAuthentified, function(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let decoded = jwt.decode(token);
       db.query(`SELECT f.id_artwork, a.art_picture, a.art_title, a.art_desc, a.id_cate
      FROM favorites f LEFT JOIN artworks a ON a.id_artwork = f.id_artwork
      WHERE f.id_user = ?`, [decoded.id], function(req, resulta){
          res.status(200).send(resulta)
      });
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
});

//______Supprimer une oeuvre de ses favoris
router.delete('/my-favs/:id_artwork', middlewares.isAuthentified, function(req, res) {
  try {
      let idArtwork = req.params.id_artwork;
      db.query(`DELETE from favorites WHERE id_artwork = ${idArtwork}`);
      res.json({
          message: 'Le produit a bien été supprimé des favoris'
      });
  } catch (e) {
      res.status(401).json({ error: e.message });
  }
});


module.exports = router;