const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const dbName = "cloudinary-posts";
mongoose.connect(`mongodb://localhost/${dbName}`,{
  keepAlive: true,
  userNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const indexRouter = require('./routes/index');
const postRouter = require('./routes/posts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
