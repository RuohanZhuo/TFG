const mongoose = require('mongoose');

let ClassSchema = new mongoose.Schema({

    className:{
        type: String,
        required: true,
        unique: true
    },
    studentCapacity:{
        type: Number,
        required:true
    }


});

let ClassModel = mongoose.model('users', ClassSchema);

module.exports = ClassModel;