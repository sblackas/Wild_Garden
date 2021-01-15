const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/category/add', function (req, res) {
    let newCategory = `INSERT INTO categories (cate_name, cate_picture) VALUES ('${req.body.name}','${req.body.picture}')`; 
       db.query(newCategory, function (err, result) { 
       if (err) throw err;
        res.send(result);
       });
   })

router.get('/category/:id_cate', function (req, res) {
    try {
        db.query(`SELECT cate_name, cate_picture FROM categories WHERE id_cate = '${req.params.id_cate}'`, (err, result) => {
            if (err) throw err
            console.log(result);
            res.json(result)

        })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/category/:id_cate', function (req, res) {
    console.log(req.body);
    db.query(`DELETE FROM categories WHERE id_cate = '${req.params.id_cate}'`, function (error, results) {
       if (error) throw error;
           res.send('Category has been deleted!');
         });
   });

   router.put('/category/:edit', function (req, res) {
    db.query(`UPDATE categories SET cate_name = '${req.body.name}', cate_picture = '${req.body.picture}' WHERE id_cate = '${req.params.edit}'` , function (error, results) {
  if (error) throw error;
   res.json('THE CATEGORY HAS BEEN UPDATED');
     });
  });

module.exports = router;
