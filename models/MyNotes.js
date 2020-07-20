const mongoose = require('mongoose');

const MyNotesSchema = new mongoose.Schema({
    id:{type: String, required: true},
    userId:{type: String, required: true},
    date:{type: Date(), required: true},
    notes:{type: String, required: true}
})

module.exports = mongoose.model('MyNotes', MyNotesSchema)