const express = require("express");
const api = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./database/db");
const routes = require('./routes/routesUsers')
const routesAdmin = require('./routes/routesAdmin')
const routesArtworks = require('./routes/routesArtworks')
const routesCategory = require('./routes/routesCategory')
const routesFeedback = require('./routes/routesFeedback')


// middleware
api.use(cors());
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}
api.use(allowCrossDomain)
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use("/", routes, routesCategory, routesAdmin, routesArtworks, routesFeedback); 




api.listen(8000, function () {
    console.log('Server listening on port 8000');
});