const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    _id:{type: mongoose.ObjectId, required: true},
    userId:{type: String, required: true},
    date:{type: Date, required: true},
    note:{type: String, required: true},
    pictures:[String]
})

NoteSchema.set('collection', 'myNotesContent');

module.exports = mongoose.model('myNotesContent', NoteSchema)