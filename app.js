const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport');
require("./config/passport")(passport)

//mongoose
mongoose.connect('mongodb://localhost/testuser',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected on port 3000'))
.catch((err)=> console.log(err));

//EJS
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : 'secret',
    resave: true,
    saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
// app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));

app.get('/login', function (req, res) {
    res.render('pages/login');
    
});

app.get('/register', function (req, res) {
    res.render('pages/register');
    
});

app.listen(3000); 