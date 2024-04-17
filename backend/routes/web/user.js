var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const StudentSubjectModel = require('../../models/StudentSubjectModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

router.get('/student', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const students = await UserModel.find({rol: 'student'})
        res.json({
            code: '0000',
            msg: 'Successfully retrieved all students',
            data: students
        });
    } catch (err) {
        console.log(err)
        res.json({
            code: '2001',
            msg: 'Error while fetching students',
            data: null
        });
    }
});

router.get('/student/subject/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const subjectId = req.params.id;

        const students = await StudentSubjectModel.find({ subject: subjectId })
            .populate({
                path: 'student',
                select: '-password'
            });

        if (students.length > 0) {
            res.json({
                code: '0000',
                msg: 'Successfully retrieved the students',
                data: students.map(course => course.student)
            });
        } else {
            return res.json({
                code: '2004',
                msg: 'No students found for this subject',
                data: students
            });
        }
    } catch (err) {
        console.log(err)
        res.json({
            code: '2005',
            msg: 'Error while fetching the students',
            data: null
        });
    }
});

router.get('/student/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const student = await UserModel.findOne({ _id: req.params.id, rol: 'student' });
        if (!student) {
            return res.json({
                code: '2002',
                msg: 'Subject not found',
                data: null
            });
        }
        res.json({
            code: '0000',
            msg: 'Successfully retrieved the student',
            data: student
        });
    } catch (err) {
        console.log(err)
        res.json({
            code: '2003',
            msg: 'Error while fetching the student',
            data: null
        });
    }
});

module.exports = router;