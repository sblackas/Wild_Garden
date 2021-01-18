const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/feedback/add', function (req, res) {
    let newFeedback = `INSERT INTO feedbacks (commentary) VALUES ('${req.body.comment}')`; 
       db.query(newFeedback, function (err, result) { 
       if (err) throw err;
        res.send(result);
       });
   })

router.get('/get-feedback/:id', function (req,res) {
   let userId = req.params.id
   let getFeedback = `SELECT  users.u_name, users.u_lastname, feedbacks.commentary FROM users INNER JOIN feedbacks on users.id_user = feedbacks.id_user WHERE feedbacks.id_user = '${userId}'`;
   db.query(getFeedback, function (err, results) {
      if (err) throw err
      res.send(results)
   })
})



   module.exports = router;