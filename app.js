var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var url = process.env.DB_URL || 'mongodb://dashboard:dashboard@10.189.164.34:27017/rio';

var app = express();

app.use(cors());
app.use(bodyParser.json())

app.use(function(req, res, next)
{
  MongoClient.connect(url,
  function(err, client) {  
    assert.equal(null, err);
    req.db = client.db("rio");
    next();
  });
})


var routerRooms = require('./routes/rooms');
app.use('/api/rooms', routerRooms)

var routerDevices = require('./routes/devices');
app.use('/api/devices', routerDevices)

var routerPower = require('./routes/power');
app.use('/api/power', routerPower)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static(path.join(__dirname, 'client/build')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



/*app.get('*', function(req, res)
{
  res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.listen(process.env.PORT || 8080, () => console.log('server listening on port ' + (process.env.PORT || 8080)));

module.exports = app;
