const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({

    SubjectName:{
        type: String,
        required: true,
        unique: true
    },
    Capacity:{
        type: Number,
        required:true
    },
    Students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    Professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

let SubjectModel = mongoose.model('subjects', SubjectSchema);

module.exports = SubjectModel;