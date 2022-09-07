require('dotenv').config();

const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('./helpers/passport');

const app = express();

//Mongo store set up
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//session config
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   httpOnly: true,
//   saveUninitialized: true,
//   cookie: { httpOnly: true, maxAge: 2419200000 },
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   })
// }));
app.use(session({
  secret: 'foo',
  store: MongoStore.create({mongoUrl:process.env.DB})
}));

//Paspport - you need to do this everytime
app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const user = require('./routes/user');
app.use('/api', index);
app.use('/user', user);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", 4000);
})

module.exports = app;

