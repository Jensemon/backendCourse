// import express
const express = require('express');

// init app by invoking express
const app = express();



// How middleware works
app.use(function(req, res, next) {
  //console.log(Date.now());
  
  // the req.name will be accessible to the rest of our app.
  req.name = 'Jensei'; // ex. you can put req.name inside the callback for app.get() to use
  

  // next middleware to run?
  next();
});



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