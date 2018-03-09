var mongoose = require("mongoose");

var fighterSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    followers: {type: Number, required: true},
    likes: {type: Number, req: true},
    pictures:{type: Number, required: true},
    picture:{type: String, required: true}
},{collection:"fighters"});

var FighterModel = mongoose.model("Fighters", fighterSchema);

module.exports = FighterModel;