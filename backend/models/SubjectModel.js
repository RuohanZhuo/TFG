const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({

    subjectName:{
        type: String,
        required: true,
        unique: true
    },
    capacity:{
        type: Number,
        required:true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

let SubjectModel = mongoose.model('subjects', SubjectSchema);

module.exports = SubjectModel;