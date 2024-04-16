var express = require('express');
var router = express.Router();
const StudentSubjectModel = require('../../models/StudentSubjectModel');
const ScheduleModel = require('../../models/ScheduleModel');
const ClassroomModel = require('../../models/ClassroomModel');
const TimetableModel = require('../../models/TimetableModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

function resetDateToZero(date) {
    date.setSeconds(0);
    date.setMilliseconds(0);
}

function changeDate(date) {
    const newDate = new Date(date);


    newDate.setUTCFullYear(2000);
    newDate.setUTCMonth(0);
    newDate.setUTCDate(1);

    resetDateToZero(newDate)
    return newDate;
}

router.post('/schedule', checkTokenMiddleware, async (req, res) => {
    try {
        const { student, subject, startTime, endTime, classroom } = req.body;
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)
        resetDateToZero(endDate);
        resetDateToZero(startDate);

        if (startDate.toDateString() !== endDate.toDateString()) {
            return res.json({
                code: '7007',
                msg: 'Start time and end time are not on the same day',
                data: null
            });
        }

        const enrollment = await StudentSubjectModel.findOne({ student, subject });
        if (!enrollment) {
            return res.json({
                code: '7001',
                msg: 'Student is not enrolled in this subject',
                data: null
            });
        }

        const request = await ScheduleModel.findOne({student, startTime: startDate,endTime: endDate});
        if (request) {
            return res.json({
                code: '7002',
                msg: 'Student has already scheduled a class during this time',
                data: null
            });
        }

        const classroomInfo = await ClassroomModel.findById(classroom);
        if (!classroomInfo) {
            return res.json({
                code: '7003',
                msg: 'Classroom not exist',
                data: null
            });
        }

        const numStudent = await ScheduleModel.countDocuments({
            subject, startTime: startDate,
            endTime: endDate, classroom
        });
        if (numStudent >= classroomInfo.studentCapacity) {
            return res.json({
                code: '7004',
                msg: 'Classroom has no more capacity',
                data: null
            });
        }

        const dayOfWeek = startDate.getDay();
        const newStartTime = changeDate(startTime);
        const newEndTime = changeDate(endTime);

        const timetableInfo = await TimetableModel.countDocuments({
            dayOfWeek, subject, startTime: newStartTime,
            endTime: newEndTime, classroom
        });

        if (!timetableInfo) {
            return res.json({
                code: '7005',
                msg: 'Timetable not exist',
                data: null
            });
        }

        const schedule = await ScheduleModel.create({
            student, startTime: startDate,
            endTime: endDate, subject, classroom
        });
        res.json({
            code: '0000',
            msg: 'Timetable created successfully',
            data: schedule
        });

    } catch (err) {
        console.log(err)
        res.json({
          code: '7006',
          msg: 'Creation failed, please try again later',
          data: null
        });
    }
});

module.exports = router;