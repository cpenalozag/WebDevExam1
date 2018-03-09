var mongoose = require("mongoose");

var FightSchema = new mongoose.Schema({
    usernameWinner: {type: String, required: true},
    usernameLoser: {type: String, required: true},
    date: {type: Number, required: true}
},{collection:"history"});

var FightModel = mongoose.model("Fights", FightSchema);

module.exports = FightModel;