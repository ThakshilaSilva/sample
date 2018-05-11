const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be67531c3a1170',
    password: 'f22ecceb',
    database: 'heroku_a645f32cc466cb0',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database')
    }
});

/*connection.query("SELECT * FROM user", (err, result) => {
    if(err){
        throw err;
    }else{
        console.log(result[0].username);
    }
});*/

module.exports = { connection };