
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// init app by invoking express
const app = express();


//middleware for mongoose, connect to server, catch promise with .then, catch error with .catch
mongoose.connect('mongodb://localhost:27017/vidjot-dev', { 
  useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err)); 

// load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');


// Hnadlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Bodyparser Middleware
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json())

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

// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
  });
  
// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if(!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if(!req.body.details) {
    errors.push({text: 'Please add some details'});
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
    };
    new Idea(newUser)
      .save()
      .then(idea => {
        res.redirect('/ideas');
      })
  }

});

// set the port to listen on
const port = 5000;

// listen on a specific port and add a callback
app.listen(port, () => {                         // fat arrow could be written as regular FE
  console.log(`Server started on port ${port}`); // ES6 for 'Server started on port' + port
});