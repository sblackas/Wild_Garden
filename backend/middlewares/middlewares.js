const jwt = require("jsonwebtoken")
const config = require('../modules/config');
const db = require('../database/db');

//____Check if token is valid
// const authJWT = (req, res, next) => {
//     let accessToken = req.headers.authorization
//        if (accessToken) {
//            const token = accessToken.split(' ')[1];
//            console.log(token);

//            jwt.verify(accessToken, config.secret, (err, decoded) => {
//                console.log(err);
//                if (err) {
//                   return res.status(403).send("Invalid token")
//                }
//            next()
//            });
//        } else {
//            res.status(403)
//        }
//    };


    const isAdmin = (req,res,next) => {
        let tokenAdmin = req.headers.authorization
        if (tokenAdmin) {
            const token = tokenAdmin.split(' ')[1];
    
            jwt.verify(token, 'supersecret', (err, decoded) => {
                if(err){
                    console.log('invalid token');
                    res.status(203).json({error: "Vous n'êtes pas autorisé à entrer"})
                }  
                else {
                    db.query(`SELECT * FROM admin WHERE id_admin = '${decoded.id}'`, function(error, result){
                        if(result.length){
                               next() 
                        } else {
                            res.status(203).json({error: "Vous n'êtes pas autorisé à entrer"})
                        }
                    })
                } 
            })
        } else {
            res.status(400).json({error: "Vous n'avez pas de token"})
        }
    }

    //______Check if token is valid
    //fonctionne pour les deux token
const isAuthentified = (req, res, next) => {
    const authJWT = req.headers.authorization;

    if (authJWT) {
        const token = authJWT.split(' ')[1];
        console.log(token);

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(403).json({error: 'Unauthorized you dont have a valid token'});
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({error: 'Unauthorized you dont have a valid token'});

    }
};



//____Can't register the same email twice
const emailMiddleware = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE u_email ='${req.body.email}'`, async function (err, results) {
        if (results.length) {
            console.log('err email already exist')
             return res.status(400).send("Email already exists")
        } else {
            next()
        }
    })
}

module.exports = { emailMiddleware, isAdmin, isAuthentified }

