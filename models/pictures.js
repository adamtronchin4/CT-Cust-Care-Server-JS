const mongoose = require('mongoose');

var PicturesSchema = new Schema({
    url: {type: String, required: true},
});