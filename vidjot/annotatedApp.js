// import express
const express = require('express');
// import express-handlebars
const exphbs = require('express-handlebars'); // from docs
// bring in mongoose
const mongoose = require('mongoose');


// init app by invoking express
const app = express();

// Map gobal promise - get rid of warning // no warning in this version, unneccesary?
mongoose.Promise = global.Promise;

// How middleware works // just an ex, no need in this app
app.use(function(req, res, next) {
  //console.log(Date.now());
  
  // the req.name will be accessible to the rest of our app.
  req.name = 'Jensei'; // ex. you can put req.name inside the callback for app.get() to use
  

  // next middleware to run?
  next();
});


//middleware for mongoose, connect to server, catch promise with .then, catch error with .catch
// Connect to mongoose => pass the server to connect to ('mongodb://localhost/_whatever_you_want_to_name_your_server_', and pass object with useMongoClient: true)
mongoose.connect('mongodb://localhost:27017/myapp', { // in tutorial the port is not specified 
    //useMongoClient: true, // this command is now deprecated
    useNewUrlParser: true // in the tutorial this is not used
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err)); // to catch a promise

// Hnadlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Index Route
// http has many requests, a get() request is basically going to a new webpage, through a link, adressbar etc.
// a post() request would be through webform or otherwise trying to send info to the server
// to update something on the server you might use a put() request, or a delete() request to remove, and so on.
app.get('/', (req, res) => {
  // handle a get request to "/" and handle the request and a response

  // access to req.name from app.use() middleware
  console.log(req.name);

  // the response is to send 'INDEX' to the browser.
  res.send('INDEX');
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
});


// set the port to listen on
const port = 5000;

// listen on a specific port and add a callback
app.listen(port, () => { // fat arrow could be written as regular FE
  console.log(`Server started on port ${port}`); // ES6 for 'Server started on port' + port
});