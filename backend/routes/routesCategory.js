const express = require('express');
const router = express.Router();
const db = require('../database/db');
const middlewares = require('../middlewares/middlewares.js');


//_____Ajouter une categorie
router.use('/category/add', middlewares.isAdmin)
router.post('/category/add', function (req, res) {
  let newCategory = `INSERT INTO categories (cate_name, cate_picture) VALUES ('${req.body.name}','${req.body.picture}')`;
  db.query(newCategory, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

//_____Recuperer les infos d'une catégorie
router.get('/category/:id_cate', function (req, res) {
  try {
    db.query(`SELECT cate_name, cate_picture FROM categories WHERE id_cate = '${req.params.id_cate}'`, (err, result) => {
      if (err) throw err
      // console.log(result);
      res.json(result)
    })
  } catch (error) {
    console.log(error);
  }
})


//_____Supprimer une categorie
router.use('/category/:id_cate', middlewares.isAdmin)
router.delete('/category/:id_cate', function (req, res) {
  // console.log(req.body);
  db.query(`DELETE FROM categories WHERE id_cate = '${req.params.id_cate}'`, function (error, results) {
    if (error) throw error;
    res.send('Category has been deleted!');
  });
});

//_____Modifier une categorie  
router.use('/category/:edit', middlewares.isAdmin)
router.put('/category/:edit', function (req, res) {
  db.query(`UPDATE categories SET cate_name = '${req.body.name}', cate_picture = '${req.body.picture}' WHERE id_cate = '${req.params.edit}'`, function (error, results) {
    if (error) throw error;
    res.json('THE CATEGORY HAS BEEN UPDATED');
  });
});

//_____Liste des categories
router.get('/categories', function (req, res) {
  try {
    let allCate = `SELECT id_cate,cate_name,cate_picture FROM categories`;
    db.query(allCate, function (err, results) {
      if (err) res.send(err);
      // console.log(results);
      res.send(results)
    })
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;
