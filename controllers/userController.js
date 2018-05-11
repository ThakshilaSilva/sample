const { getConnection } = require('../dbConnection');

const getUser = (user) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM user where username=?", [user.username],
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                    //console.log(password);
                });
            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
};

const getAchievements = (achievement) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM userachievement WHERE UserID = ?", [achievement.username],
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        });
    }).catch((error) => {
        reject(error);
    });
};

const addAchievement = (user) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("INSERT INTO userachievement VALUE(?,?,?,?,?,?,?)", [
                user.username,
                user.field,
                user.type,
                user.achievementName,
                user.description,
                user.date,
                null
            ], (err, res) => {
                console.log("response", res);
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
            connection.release();
        });
    }).catch((error) => {
        reject(error);

    });
};



const getUsers = () => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM user",
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        });
    }).catch((error) => {
        reject(error);
    });
}

const getStudents = () => { // query every student from the database
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("select * from user ORDER BY FirstName",
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        });
    });
};

const addNewUser = (user) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("INSERT INTO user VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                user.username,
                user.fname,
                user.lname,
                user.initials,
                user.nic,
                user.dob,
                user.gender,
                user.tp,
                user.address,
                user.email,
                user.stream,
                user.userRole,
                user.profilePic,
                user.fb,
                user.linkedIn,
                user.college,
                user.password

            ], (err, res) => {
                console.log("response", res);
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
            connection.release();
        });
    }).catch((error) => {
        reject(error);
    });

}

// const addNewUser = (user) => {
//     return new Promise((resolve, reject) => {
//         connection.connect();
//         connection.query("INSERT INTO user VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
//             user.username,
//             user.fname,
//             user.lname,
//             user.initials,
//             user.nic,
//             user.dob,
//             user.gender,
//             user.tp,
//             user.address,
//             user.email,
//             user.stream,
//             user.userRole,
//             user.profilePic,
//             user.fb,
//             user.linkedIn,
//             user.college,
//             user.password

//         ], (err, res) => {
//             console.log("response", res);
//             if (err) {
//                 return reject(err);
//             }
//             resolve(res);
//         });
//         connection.end();
//     }).catch((error) => {
//         reject(error);
//     });
// }


const updateUser = (user) => {
    //console.log(user.linkedIn);
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("UPDATE user SET FirstName=?, LastName=?, ContactNo=?, Address=?, Facebook=?, LinkedIn=? WHERE Username=?", [
                user.firstname,
                user.lastname,
                user.tp,
                user.address,
                user.fb,
                user.linkedIn,
                user.username
            ], (err, result) => {
                if (err) {
                    reject(err);
                    console.log("ERROR " + err);
                }
                resolve(result);
                //console.log("res " + result);
            });
            connection.release();
        });
    }).catch((error) => {
        reject(error);
    });
}

const updateProfilePic = (user) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("UPDATE user SET ProfilePic =? WHERE Username = ?", [
                user.photo,
                user.username
            ], (err, result) => {
                if (err) {
                    reject(err);
                    console.log("Error " + err);
                }
                resolve(result);
            });
            connection.release();
        });
    }).catch((error) => {
        reject(error);
    });
}

module.exports = {
    getUser,
    addNewUser,
    updateUser,
    getStudents,
    getAchievements,
    addAchievement,
    updateProfilePic
};