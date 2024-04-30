var express = require('express');
var router = express.Router();
const TimetableModel = require('../../models/TimetableModel');
const SubjectModel = require('../../models/SubjectModel');
const ScheduleModel = require('../../models/ScheduleModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

function resetDateToZero(date) {
    date.setSeconds(0);
    date.setMilliseconds(0);
}

router.post('/timetable', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const {dayOfWeek, startHour, startMinute, endHour, endMinute, subject, classroom} = req.body;

        const subjects = await SubjectModel.find({professor: req.user._id, _id:subject});
        if(subjects.length === 0){
            return res.json({
                code: '6009',
                msg: 'The subject does not exist or this subject does not belong to this teacher',
                data: null
            });
        }

        if (startHour < 0 || startHour >= 24 || startMinute < 0 || startMinute >= 60 ||
            endHour < 0 || endHour >= 24 || endMinute < 0 || endMinute >= 60) {
            return res.json({
                code: '6006',
                msg: 'Invalid time range',
                data: null
            });
        }

        const durationInMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
        if (durationInMinutes < 60) {
            return res.json({
                code: '6003',
                msg: 'A lesson takes at least one hour',
                data: null
            });
        }

        if (startHour < 9 || startHour > 20 || endHour < 10 || 
            (endHour == 21 && endMinute > 0) || endHour > 21) {
            return res.json({
                code: '6004',
                msg: 'Class hours are from 9 am to 9 pm',
                data: null
            });
        }

        if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
            return res.json({
                code: '6005',
                msg: 'Start time must be earlier than end time',
                data: null
            });
        }

        const startTime = new Date(2000, 0, 1, startHour, startMinute);
        const endTime = new Date(2000, 0, 1, endHour, endMinute);
        endTime.setUTCHours(endHour, endMinute);
        resetDateToZero(endTime);
        resetDateToZero(startTime);
        startTime.setUTCHours(startHour, startMinute);
        

        const conflictingTimetable = await TimetableModel.findOne({
            dayOfWeek,
            classroom,
            $or: [
                {startTime: {$lt:endTime}, endTime: {$gt:startTime}},
                {startTime: {$gte:startTime, $lt:endTime}},
                {endTime: {$gt:startTime, $lte:endTime}}
            ]
        });

        if (conflictingTimetable) {
            return res.json({
                code: '6001',
                msg: 'Classroom time slot is already booked',
                data: null
            });
        }

        const timetable = await TimetableModel.create({dayOfWeek, startTime, endTime, subject, classroom});
        res.json({
            code: '0000',
            msg: 'Timetable created successfully',
            data: timetable
        });
    } catch (err) {
        console.log(err)
        res.json({
          code: '6002',
          msg: 'Creation failed, please try again later',
          data: null
        });
    }
});

router.get('/timetable/subject/:id', checkTokenMiddleware, async (req, res) => {
    try {
        const subjectId = req.params.id;

        const timetable = await TimetableModel.find({subject: subjectId})
            .populate('subject')
            .populate('classroom');

        res.json({
            code: '0000',
            msg: 'Timetable retrieved successfully',
            data: timetable
        });
    } catch (err) {
        console.error(err);
        res.json({
            code: '6007',
            msg: 'Error while fetching the timetable',
            data: null
        });
    }
});

router.get('/timetable/classroom/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const classroomId = req.params.id;

        const timetable = await TimetableModel.find({classroom: classroomId})
            .populate('subject')
            .populate('classroom');

        res.json({
            code: '0000',
            msg: 'Timetable retrieved successfully',
            data: timetable
        });
    } catch (err) {
        console.error(err);
        res.json({
            code: '6008',
            msg: 'Error while fetching the timetable',
            data: null
        });
    }
});

router.delete('/timetable/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {

        const timetable = await TimetableModel.deleteOne({_id: req.params.id});
        if (timetable.deletedCount === 0) {
            return res.json({
                code: '6010',
                msg: 'Timetable not found',
                data: null
            });
        }

        await ScheduleModel.deleteMany({timetable: req.params.id});

        res.json({
            code: '0000',
            msg: 'Timetable and related schedules deleted successfully',
            data: null
        });
    } catch (err) {
        console.log(err);
        res.json({
            code: '6011',
            msg: 'Error while deleting the schedule',
            data: null
        });
    }
});

module.exports = router;