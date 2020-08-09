const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id:{type: mongoose.ObjectId, required: true},
    userId:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    password:{type: String, required: true},
    roles:{type: String, required: true}
})

UserSchema.set('collection', 'users');

module.exports = mongoose.model('User', UserSchema)