const mongoose = require('mongoose');

const MyNotesIDSchema = new mongoose.Schema({
    _id:{type: mongoose.ObjectId, required: true},
    userId:{type: String, required: true},
    notes:[mongoose.ObjectId]
})

MyNotesIDSchema.set('collection', 'myNotesID');

module.exports = mongoose.model('myNotesID', MyNotesIDSchema)