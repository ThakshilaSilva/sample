const { getConnection } = require('../dbConnection');

const addEvent = (event) => {
    return new Promise((resolve, reject) => {

        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("INSERT INTO batchevent VALUE(?,?,?,?,?,?,?,?,?,?,?,?)", [
                null,
                event.eventName,
                event.date,
                event.description,
                event.photo1,
                event.photo2,
                event.photo3,
                event.photo4,
                event.photo5,
                event.album1,
                event.album2,
                event.album3
            ], (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });

            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
}

const addAcaEvent = (event) => {
    return new Promise((resolve, reject) => {

        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("INSERT INTO upcomingevent VALUE(?,?,?,?,?)", [
                null,
                event.module,
                event.name,
                event.description,
                event.date
            ], (err, res) => {

                if (err) {
                    reject(err);
                    console.log(err);
                }
                resolve(res);
            });
            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
};

const getEditableBatchEvent = (item) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM batchEvent WHERE EventID=?", [item.EventID],
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

const getEvents = () => {
    return new Promise((resolve, reject) => {

        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM batchevent ORDER BY EventDate DESC",
                (err, res) => {
                    connection.connect();
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
}

const getAcaEvents = () => { // query every student from the database
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("select * from upcomingevent",
                (err, res) => {
                    connection.connect();
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        })
    });
};

const getEditableAcaEvent = (item) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM upcomingevent WHERE EventID=?", [item.EventID],
                (err, res) => {

                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
};

/*const getEditableBatchEvent = (item) => {
    return new Promise((resolve, reject) => {
        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("SELECT * FROM batchEvent WHERE EventID=?", [item.EventID],
                (err, res) => {
                    connection.end();
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            connection.release();
        })
    }).catch((error) => {
        reject(error);
    });
};*/

const updateAcaEvent = (event) => {

    return new Promise((resolve, reject) => {

        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("UPDATE upcomingevent SET ModuleCode=?, ModuleName=?, EventDetail=? WHERE EventID=?", [
                event.code,
                event.name,
                event.detail,
                event.ID
            ], (err, result) => {

                if (err) {
                    reject(err);
                    console.log("ERROR " + err);
                }
                resolve(result);
                console.log("res " + result);
            });

            connection.release();
        })
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
}

const updateBatchEvent = (event) => {

    return new Promise((resolve, reject) => {

        getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
            }
            connection.query("UPDATE batchEvent SET EventName=?, EventDescription=?, photoAlbum1=?, photoAlbum2=?, photoAlbum3=? WHERE EventID=?", [
                event.name,
                event.description,
                event.album1,
                event.album2,
                event.album3,
                event.ID
            ], (err, result) => {

                if (err) {
                    reject(err);
                    console.log("ERROR " + err);
                }
                resolve(result);
                console.log("res " + result);
            });
            connection.release();
        })
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
}

module.exports = {
    addEvent,
    getEvents,
    addAcaEvent,
    getAcaEvents,
    getEditableAcaEvent,
    updateAcaEvent,
    getEditableBatchEvent,
    updateBatchEvent
};