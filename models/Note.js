var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title:String,
    body: String
});

let note = mongoose.model("Note", NoteSchema);

module.exports = Note;