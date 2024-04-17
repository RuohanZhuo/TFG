const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    expireAt: {
        type: Date,
        default: function() {
            const nextDay = new Date(this.endTime);
            return nextDay;
        },
        index: { expires: '0s' }
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classrooms',
        required: true
    }
});

const ScheduleModel = mongoose.model('schedules', ScheduleSchema);

module.exports = ScheduleModel;
