const express = require('express');
const router = express.Router();
const db = require('../database/db');
const middlewares = require('../middlewares/middlewares.js');

//____Poster un commentaire
router.use('/feedback/add', middlewares.isArtist)
router.post('/feedback/add', function (req, res) {
   console.log(req.body)
   let newFeedback = `INSERT INTO feedbacks (commentary, id_user, id_artwork) VALUES ('${req.body.comment}', ${req.body.id_user}, ${req.body.id_artwork})`;
   db.query(newFeedback, function (err, result) {
      if (err) throw err;
      res.send(result);
   });
})

//____Supprimer un commentaire
router.use('/feedback/:id_feedback', middlewares.isArtist)
router.delete('/feedback/:id_feedback', function (req, res) {
   console.log(req.body);
   db.query(`DELETE FROM feedbacks WHERE id_feedback = '${req.params.id_feedback}'`, function (error, results) {
      if (error) throw error;
      res.send('Commentary has been deleted!');
   });
});

//____Modifier un commentaire
router.put('/feedback/:edit', function (req, res) {
   db.query(`UPDATE feedbacks SET commentary = '${req.body.comment}' WHERE id_feedback = '${req.params.edit}'`, function (error, results) {
      if (error) throw error;
      res.json('THE COMMENT HAS BEEN MODIFIED');
   });
});

//_____Liste des tous les commentaires
router.use('/feedbacks/', middlewares.isAdmin)
router.get('/feedbacks', function (req, res) {
   let allFeedbacks = `SELECT id_feedback,commentary FROM feedbacks`;
   db.query(allFeedbacks, function (err, result) {
 
     if (err) res.send(err);
     console.log(result);
     res.send(result)
   })
 
 })

//_____Recuperer tous les commentaires posté par un user
// router.use('/get-feedback/:id', middlewares.isAdmin)
router.get('/get-feedback-user/:id', function (req, res) {
   let userId = req.params.id
   let getFeedback = `SELECT  users.u_name, users.u_lastname, feedbacks.commentary FROM users INNER JOIN feedbacks on users.id_user = feedbacks.id_user WHERE users.id_user = '${userId}'`
   db.query(getFeedback, function (err, results) {
      if (err) throw err
      res.send(results)
   })
})

//_____Recuperer tous les commentaires postés sur une oeuvre
router.get('/get-feedback-artwork/:id_artwork', function (req, res) {
   let artFeedbackId = req.params.id_artwork
   let getFeedbackOnArt = `SELECT feedbacks.commentary, users.u_name, users.u_lastname FROM feedbacks INNER JOIN users on feedbacks.id_user = users.id_user WHERE feedbacks.id_artwork = ${artFeedbackId}`
   db.query(getFeedbackOnArt, function (err, results) {
      if (err) throw err
      res.send(results)
   })
})





module.exports = router;