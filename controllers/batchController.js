const { connection } = require('../dbConnection');

const addEvent = (event) => {
    return new Promise((resolve, reject) => {
        connection.connect();
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
            connection.end();
            if (err) {
                reject(err);
            }
            resolve(res);
        });

    }).catch((error) => {
        reject(error);
    });
}

const addAcaEvent = (event) => {
    return new Promise((resolve, reject) => {
        connection.end();

        connection.query("INSERT INTO upcomingevent VALUE(?,?,?,?,?)", [
            null,
            event.module,
            event.name,
            event.description,
            event.date
        ], (err, res) => {
            connection.connect();
            if (err) {
                reject(err);
                console.log(err);
            }
            resolve(res);
        });

    }).catch((error) => {
        reject(error);
    });
};



const getEvents = () => {
    return new Promise((resolve, reject) => {
        connection.end();

        connection.query("SELECT * FROM batchevent",
            (err, res) => {
                connection.connect();
                if (err) {
                    reject(err);
                }
                resolve(res);
            });

    }).catch((error) => {
        reject(error);
    });
}

const getAcaEvents = () => { // query every student from the database
    return new Promise((resolve, reject) => {
        connection.end();

        connection.query("select * from upcomingevent",
            (err, res) => {
                connection.connect();
                if (err) {
                    reject(err);
                }
                resolve(res);
            });

    });
};

const getEditableAcaEvent = (item) => {
    return new Promise((resolve, reject) => {

        connection.connect();
        connection.query("SELECT * FROM upcomingevent WHERE EventID=?", [item.EventID],
            (err, res) => {
                connection.end();
                if (err) {
                    reject(err);
                }
                resolve(res);
            });

    }).catch((error) => {
        reject(error);
    });
};

const getEditableBatchEvent = (item) => {
    return new Promise((resolve, reject) => {

        connection.connect();
        connection.query("SELECT * FROM batchEvent WHERE EventID=?", [item.EventID],
            (err, res) => {
                connection.end();
                if (err) {
                    reject(err);
                }
                resolve(res);
            });

    }).catch((error) => {
        reject(error);
    });
};

const updateAcaEvent = (event) => {

    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query("UPDATE upcomingevent SET ModuleCode=?, ModuleName=?, EventDetail=? WHERE EventID=?", [
            event.code,
            event.name,
            event.detail,
            event.ID
        ], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
                console.log("ERROR " + err);
            }
            resolve(result);
            console.log("res " + result);
        });

    }).catch((error) => {
        console.log(error);
        reject(error);
    });
}

const updateBatchEvent = (event) => {

    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query("UPDATE batchEvent SET EventName=?, EventDescription=?, photoAlbum1=?, photoAlbum2=?, photoAlbum3=? WHERE EventID=?", [
            event.name,
            event.description,
            event.album1,
            event.album2,
            event.album3,
            event.ID
        ], (err, result) => {
            connection.end();
            if (err) {
                reject(err);
                console.log("ERROR " + err);
            }
            resolve(result);
            console.log("res " + result);
        });

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