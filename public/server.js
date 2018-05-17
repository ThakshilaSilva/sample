var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var UserControllers = require('./controllers/userController');
var BatchController = require('./controllers/batchController');
var opn = require('opn');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is listening on port 3000');
    }
});



app.post("/get_user", (req, res) => {
    UserControllers.getUser(req.body).then((result) => {
        res.status(200).send(result);
        //console.log("successful");
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/add_new_user", (req, res) => {
    UserControllers.addNewUser(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/add_event", (req, res) => {
    BatchController.addEvent(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
        console.log(err);
    });
});

app.post("/updateUser", (req, res) => {
    UserControllers.updateUser(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.post("/updateProfilePic", (req, res) => {
    UserControllers.updateProfilePic(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.get("/getMembers", (req, res) => { //  get all of the members
    UserControllers.getStudents().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get("/get_events", (req, res) => {
    BatchController.getEvents().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/getAchievements", (req, res) => {
    UserControllers.getAchievements(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/addAchievement", (req, res) => {
    UserControllers.addAchievement(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/addAcaEvent", (req, res) => {
    BatchController.addAcaEvent(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get("/getAcaEvents", (req, res) => { //  get all of the members
    BatchController.getAcaEvents().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.post("/getSelectedAcaEvent", (req, res) => {
    BatchController.getEditableAcaEvent(req.body).then((result) => {
        res.status(200).send(result);
        //console.log("successful");
    }).catch((err) => {
        res.status(400).send(err);
    });
});


app.post("/getSelectedBatchEvent", (req, res) => {
    BatchController.getEditableBatchEvent(req.body).then((result) => {
        res.status(200).send(result);
        //console.log("successful");
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/updateAcaEvent", (req, res) => {
    BatchController.updateAcaEvent(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post("/updateBatchEvent", (req, res) => {
    BatchController.updateBatchEvent(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


const multer = require('multer');


var store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "/public/uploads"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});


var upload = multer({ storage: store }).single('file');

app.post('/upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        //do all database record saving activity
        return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
    });
});

app.post('/uploadProfilePic', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/people', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/timeline', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/editProfile', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/achievement', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/addBatchEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/editBatchEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/addAcademicEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/editAcademicEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/lTimeline', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/lPeople', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/member', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/userl', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/addAcdemicEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/editAcaEvents', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});