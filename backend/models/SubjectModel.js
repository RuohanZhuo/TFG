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
    Student:{

    },
    Professor:{

    }

});

let SubjectModel = mongoose.model('users', SubjectSchema);

module.exports = SubjectModel;