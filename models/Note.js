var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title:String,
    body: String
});

let Note = mongoose.model("Note", noteSchema);

module.exports = Note;