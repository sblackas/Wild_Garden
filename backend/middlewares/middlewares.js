const jwt = require("jsonwebtoken")
const config = require('../modules/config');
const db = require('../database/db');

//____Check if token is valid
const authJWT = (req, res, next) => {
    let accessToken = req.headers.authorization
       if (accessToken) {
           const token = accessToken.split(' ')[1];
           console.log(token);

           jwt.verify(accessToken, config.secret, (err, decoded) => {
               console.log(err);
               if (err) {
                   res.status(403).send("Invalid token")
               }
           next()
           });
       } else {
           res.status(403)
       }
   };

//____Check if logged one is admin 
const isAdmin = (req, res, next) => {
     let tokenAdmin = req.headers.authorization
        if (tokenAdmin) {
            const token = tokenAdmin.split(' ')[1];
            console.log(token);

            jwt.verify(tokenAdmin, config.secret, (err, decoded) => {
                console.log(err);
                if (err) {
                    res.status(403).send("Unauthorized you are not the admin")
                }
            next()
            });
        } else {
            res.status(403)
        }
    };




//____Check if logged one is artist
// const isArtist = (req, res, next) => {
//      let token = req.headers.token
//     jwt.verify(token, config.secret, (err, decoded) => {

//         if (decoded) {
//             next()
//         } else {
//             res.status(403).send("your are not an artist")
//         }
//     })


// }

const isArtist = (req, res, next) => {
    const artistToken = req.headers.authorization;

    if (artistToken) {
        const token = artistToken.split(' ')[1];
        console.log(token);

        jwt.verify(token, config.secret, (err, decoded) => {
            console.log(err)
            if (err) {
                return res.status(403).json({error: 'Unauthorized you are not an artist'});
            }
            next();
        });
    } else {
        res.status(401).send("NON");
    }
};

module.exports

//____Can't register the same email twice
const emailMiddleware = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE u_email ='${req.body.email}'`, async function (err, results) {
        if (results.length) {
            console.log('err email already exist')
            res.status(400).send("Email already exists")
        } else {
            next()
        }
    })
}

module.exports = { authJWT, emailMiddleware, isAdmin, isArtist }

