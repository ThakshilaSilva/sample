const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'id5708101_thakshila',
    password: 'MethmI&1',
    database: 'id5708101_cse15db',
    port: ''
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