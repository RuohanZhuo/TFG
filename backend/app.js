var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authRouter = require('./routes/web/auth');
const classroomRouter = require('./routes/web/classroom');
const subjectRouter = require('./routes/web/subject');
const userRouter = require('./routes/web/user');
const studentSubjectRouter = require('./routes/web/studentSubject');
const timetableRouter = require('./routes/web/timetable');
const scheduleRouter = require('./routes/web/schedule');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', studentSubjectRouter);
app.use('/', scheduleRouter);
app.use('/', timetableRouter);
app.use('/', classroomRouter);
app.use('/', subjectRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
