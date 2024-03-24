var express = require('express');
var router = express.Router();
const SubjectModel = require('../../models/SubjectModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

router.post('/subject', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    const subjectInfo = req.body;

    try {
        const subject = await SubjectModel.create({ ...subjectInfo, professor: req.user._id})
        res.json({
            code: '0000',
            msg: 'Subject creation successful',
            data: subject
        });
    } catch (err) {
        console.log(err);
        res.json({
            code: '4001',
            msg: 'Subject creation failed, please try again later',
            data: null
        });
    }
});

router.get('/subject', async (req, res) => {
    try {
        const subjects = await SubjectModel.find({});
        res.json({
            code: '0000',
            msg: 'Successfully retrieved all subjects',
            data: subjects
        });
    } catch (err) {
        console.log(err)
        res.json({
            code: '4002',
            msg: 'Error while fetching subjects',
            data: null
        });
    }
});

router.get('/subject/:id', async (req, res) => {
    try {
        const subject = await SubjectModel.findById(req.params.id);
        if (!subject) {
            return res.json({
                code: '4003',
                msg: 'Subject not found',
                data: null
            });
        }
        res.json({
            code: '0000',
            msg: 'Successfully retrieved the subject',
            data: subject
        });
    } catch (err) {
        console.log(err)
        res.json({
            code: '4004',
            msg: 'Error while fetching the subject',
            data: null
        });
    }
});

router.delete('/subject/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
    try {
      const subject = await SubjectModel.findByIdAndDelete(req.params.id);
      if (!subject) {
        return res.json({
          code: '4005',
          msg: 'Subject not found',
          data: null
        });
      }
      res.json({
        code: '0000',
        msg: 'Subject deleted successfully',
        data: subject
      });
    } catch (err) {
      console.log(err)
      res.json({
        code: '4006',
        msg: 'Error while deleting subject',
        data: null
      });
    }
  });

module.exports = router;