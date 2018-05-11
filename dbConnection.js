const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'us-cdbr-iron-east-04.cleardb.net',
//     user: 'be67531c3a1170',
//     password: 'f22ecceb',
//     database: 'heroku_a645f32cc466cb0',
//     port: '3306'
// });

const connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be67531c3a1170',
    password: 'f22ecceb',
    database: 'heroku_a645f32cc466cb0',
    port: '3306',
    connectionLimit: 10
});

// connection.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Connected to the database')
//     }
// });

// connectionPool.on('connection', function(connection) {
//     console.log('DB Connection established');

//     connection.on('error', function(err) {
//         console.error(new Date(), 'MySQL error', err.code);
//     });
//     connection.on('close', function(err) {
//         console.error(new Date(), 'MySQL close', err);
//     });

// });


var getConnection = function(callback) {
    connectionPool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = { getConnection };



/*connection.query("SELECT * FROM user", (err, result) => {
    if(err){
        throw err;
    }else{
        console.log(result[0].username);
    }
});*/

// module.exports = { connectionPool };