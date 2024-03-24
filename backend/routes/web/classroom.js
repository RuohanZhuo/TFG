var express = require('express');
var router = express.Router();
const ClassroomModel = require('../../models/ClassroomModel');

const checkIsProfessorMiddleware = require('../../middlewares/checkIsProfessorMiddleware');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

router.post('/classroom', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
  const classroomInfo = req.body

  try {
    console.log(classroomInfo)
    const classroom = await ClassroomModel.create({ ...classroomInfo })
    res.json({
      code: '0000',
      msg: 'creation success',
      data: classroom
    });
  } catch(err){
    console.log(err)
    res.json({
      code: '3001',
      msg: 'Creation failed, please try again later',
      data: null
    });
  }
});

router.get('/classroom', async (req, res) => {
  try {
    const classrooms = await ClassroomModel.find({});
    res.json({
      code: '0000',
      msg: 'Successfully retrieved all classrooms',
      data: classrooms
    });
  } catch (err) {
    console.log(err)
    res.json({
      code: '3002',
      msg: 'Error while fetching classrooms',
      data: null
    });
  }
});

router.get('/classroom/:id', async (req, res) => {
  try {
    const classroom = await ClassroomModel.findById(req.params.id);
    if (!classroom) {
      return res.json({
        code: '3003',
        msg: 'Classroom not found',
        data: null
      });
    }
    res.json({
      code: '0000',
      msg: 'Successfully retrieved the classroom',
      data: classroom
    });
  } catch (err) {
    console.log(err)
    res.json({
      code: '3004',
      msg: 'Error while fetching the classroom',
      data: null
    });
  }
});

router.delete('/classroom/:id', checkTokenMiddleware, checkIsProfessorMiddleware, async (req, res) => {
  try {
    const classroom = await ClassroomModel.findByIdAndDelete(req.params.id);
    if (!classroom) {
      return res.json({
        code: '3005',
        msg: 'Classroom not found',
        data: null
      });
    }
    res.json({
      code: '0000',
      msg: 'Classroom deleted successfully',
      data: classroom
    });
  } catch (err) {
    console.log(err)
    res.json({
      code: '3006',
      msg: 'Error while deleting classroom',
      data: null
    });
  }
});


module.exports = router;