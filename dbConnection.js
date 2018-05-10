const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cse'
});

connection.connect((err) => {
    if(err){
        console.log(err);
    }else{
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

module.exports = {connection};