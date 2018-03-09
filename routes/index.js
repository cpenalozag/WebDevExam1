var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var url = process.env.MONGOLAB_URI;

var FighterModel = require("../models/FighterModel.js");
var FightModel = require("../models/FightModel.js");

/* Mongoose Setup */
//Set up default mongoose connection
mongoose.connect(url);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/* GET fighters from db */
router.get("/fighters", function (req, res) {
    FighterModel.find().then(function (doc) {
        console.log(doc);
        res.send(doc);
    });
});
/* GET fighters from db */
router.get("/fighters/champion", function (req, res) {
    FighterModel.findOne().sort('-likes').then(function (doc) {
        console.log(doc);
        res.send(doc);
    });
});
/* GET fighter from db */
router.get("/fighters/:username", function (req, res) {
    FighterModel.findOne({"username": req.params.username}).then(function (doc) {
        console.log(doc);
        res.send(doc);
    }).catch((error)=>console.log(error));
});

/* POST fighter to db */
router.post("/fighters", function (req, res) {
    console.log(req.body);
    let item = {
        username: req.body.username,
        followers: req.body.followers,
        likes: req.body.likes,
        pictures: req.body.pictures,
        picture: req.body.picture

    };
    console.log(item);
    let data = new FighterModel(item);
    data.save();
    res.send(data);
});

/* POST fight to db */
router.post("/history", function (req, res) {
    console.log(req.body);
    let item = {
        usernameWinner: req.body.usernameWinner,
        usernameLoser: req.body.usernameLoser,
        date: Date.now()
    };
    console.log("aaa", item);
    let data = new FightModel(item);
    data.save();
    res.send(data);
});

/* GET fighters from db */
router.get("/history", function (req, res) {
    FightModel.find().sort('date').then(function (doc) {
        console.log(doc);
        res.send(doc);
    });
});


router.get("/fight/:user1/:user2", function (req, res) {
    console.log(req.params);
    fetch("https://www.instagram.com/" + req.params + "/?__a=1")
        .then((response) => response.json())
        .then((responseJson) => {
            var json1 = responseJson;
            fetch("https://www.instagram.com/" + user2 + "/?__a=1")
                .then((response) => response.json())
                .then((responseJson) => {
                    var json2 = responseJson;
                    const resp = getWinner(json1, json2);

                })
                .catch((error) => {
                    console.log("mal1");
                });
        })
        .catch((error) => {
            console.log("mal2");
        })
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});


module.exports = router;
