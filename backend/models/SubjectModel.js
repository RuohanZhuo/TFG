const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({

    subjectName:{
        type: String,
        required: true,
        unique: true
    },
    acronym:{
        type: String,
        required: true,
        unique: true
    },
    capacity:{
        type: Number,
        required:true
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

let SubjectModel = mongoose.model('subjects', SubjectSchema);

module.exports = SubjectModel;