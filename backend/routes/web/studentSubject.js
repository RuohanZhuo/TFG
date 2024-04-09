var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const SubjectModel = require('../../models/SubjectModel');
const StudentSubjectModel = require('../../models/StudentSubjectModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

router.post('/studentSubject', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
        const {studentId, subjectId} = req.body;

        const student = await UserModel.findOne({_id: studentId, rol: 'student'});
        if (!student) {
            return res.json({
                code: '5001',
                msg: 'Student not exist',
                data: null
            });
        }

        const subject = await SubjectModel.findById(subjectId);
        if (!subject) {
            return res.json({
                code: '5002',
                msg: 'Subject not exist',
                data: null
            });
        }

        const enrollment = await StudentSubjectModel.findOne({student: studentId, subject: subjectId});
        if (enrollment) {
            return res.json({
                code: '5003',
                msg: 'Student is already enrolled in this subject',
                data: null
            });
        }

        const enrolledStudentsCount = await StudentSubjectModel.countDocuments({subject: subjectId});
        if (enrolledStudentsCount >= subject.capacity) {
            return res.json({
                code: '5004',
                msg: 'Subject has no more capacity',
                data: null
            });
        }

        await StudentSubjectModel.create({student: studentId, subject: subjectId});
        res.json({
            code: '0000',
            msg: 'Student enrolled successfully',
            data: null
        });
    } catch (err) {
        console.log(err);
        res.json({
            code: '5005',
            msg: 'Subject enrollment failed, please try again later',
            data: null
        });
    }
});

router.get('/subject/student/:id', checkTokenMiddleware, async (req, res) => {
    try {
      const studentId = req.params.id;
  
      const studentSubjects = await StudentSubjectModel.find({student: studentId}).populate('subject');
  
      if (studentSubjects.length > 0) {
        res.json({
            code: '0000',
            msg: 'Successfully retrieved the subject',
            data: studentSubjects.map(course => course.subject)
          });
      } else {
        return res.json({
            code: '5006',
            msg: 'No Subjects found for this student',
            data: null
          });
      }
    } catch (err) {
        console.log(err)
        res.json({
          code: '5007',
          msg: 'Error while fetching the subject',
          data: null
        });
    }
  });

module.exports = router;