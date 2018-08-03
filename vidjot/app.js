// import express
const express = require('express');
// import express-handlebars
const exphbs = require('express-handlebars'); // from docs


// init app by invoking express
const app = express();

// Hnadlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Index Route
app.get('/', (req, res) => {
  // handle a get request to "/" and handle the request and a response
  const title = 'Welcome My Friend';

  // the server response is to render index.handlebars and pass in an object.
  res.render('index', {
    title: title,
  });


});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});


// set the port to listen on
const port = 5000;

// listen on a specific port and add a callback
app.listen(port, () => {                         // fat arrow could be written as regular FE
  console.log(`Server started on port ${port}`); // ES6 for 'Server started on port' + port
});