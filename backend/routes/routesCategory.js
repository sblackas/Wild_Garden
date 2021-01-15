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

module.exports = router;
