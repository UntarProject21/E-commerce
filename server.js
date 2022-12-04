const port = process.env.PORT || 3000;
var express = require('express');

const indexRouter = require('./routes/index');
const api = require('./routes/api');


var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded : ' + process.env.DB_URL);
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
});



app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: database
    })
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use( express.static( "public" ) );



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})

app.use('/', indexRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = {
  database,
  app
}






/*
app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
});


var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

const app = express();

const indexRouter = require('./routes/index');
const api = require('./routes/api');

let config;
try {
    config = require("./config");
} catch (e) {
    console.log("No config file found");
    process.exit(0);
}

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
    res.header("Access-Control-Allow-Headers", "custId, appId, Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN, Access-Control-Allow-Origin, X-Requested-With");
    res.header("Access-Control-Expose-Headers", "Authorization, authenticated");
    res.header("Access-Control-Max-Age", "1728000");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.static("public"));
app.use('/', indexRouter);
app.use('/api', api);

app.listen(config.port, () => {
    console.log(`Server is running on port : ${config.port}`);
});
module.exports = app;
*/