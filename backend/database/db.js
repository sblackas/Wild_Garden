const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wildgardendb',
    port: 3306
})

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected to database");

    connection.query(`CREATE TABLE IF NOT EXISTS admin
    (id_admin INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    a_lastname VARCHAR(150) NOT NULL, 
    a_name VARCHAR(150) NOT NULL, 
    a_email VARCHAR(250) NOT NULL UNIQUE, 
    a_password VARCHAR(250) NOT NULL)`); 

    connection.query(`CREATE TABLE IF NOT EXISTS users
    (id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    u_lastname VARCHAR(150) NOT NULL, 
    u_name VARCHAR(150) NOT NULL, 
    u_email VARCHAR(250) NOT NULL UNIQUE, 
    u_password VARCHAR(250) NOT NULL,
    u_pp VARCHAR(150) NOT NULL
    )`); 

    connection.query(`CREATE TABLE IF NOT EXISTS artworks
    (id_artwork INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
     art_title VARCHAR(250) NOT NULL, 
     art_desc VARCHAR NOT NULL,
     art_picture BLOB NOT NULL, 
     id_user INT,
     id_cate INT,
     FOREIGN KEY (id_user) REFERENCES users(id_user),
     FOREIGN KEY (id_cate) REFERENCES categories(id_cate)
     )`);

     connection.query(`CREATE TABLE IF NOT EXISTS categories
     (id_cate INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
     cate_name VARCHAR(150) NOT NULL, 
     cate_picture VARCHAR(150) NOT NULL
     )`);

     connection.query(`CREATE TABLE IF NOT EXISTS favorites
    (id_favorite INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
     id_user INT,
     id_artwork INT,
     FOREIGN KEY (id_user) REFERENCES users(id_user),
     FOREIGN KEY (id_favorite) REFERENCES favorites(id_favorites)
     )`);

     connection.query(`CREATE TABLE IF NOT EXISTS feedbacks
     (id_feedback INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        id_user INT,
        id_artwork INT,
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_favorite) REFERENCES favorites(id_favorites)
     )`);


});

module.exports = connection;