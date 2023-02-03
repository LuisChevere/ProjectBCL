if (process.env.PRODUCTION) {
  require("dotenv").config();
}

const path = require("path");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const sequelize = require("./config/connection");
const User = require("./models/User");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const {
  checkAuthenticated,
  checkNotAuthenticated,
  priceFormat,
} = require("./helpers/index");

// sql creation code here
// const user = require('./models/user')
// function for finding user based on email and configuring the passport
initializePassport(
  passport,
  (email) => User.findOne({ email: email }),
  (id) => User.findOne({ _id: id })
);

const hbs = exphbs.create({
  checkAuthenticated,
  checkNotAuthenticated,
  priceFormat,
});

// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )
// temporary variable to store users
// take the forms and access them inside of request variable in the post method
// allows use of ejs
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    // .env
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// what we pass for our method
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// route for index
// app.get('/', checkAuthenticated, (req,res) => {
//     res.render('index.ejs', { name: req.user.name })
// })

// // route for login
// app.get('/login', checkNotAuthenticated, (req,res) => {
//     res.render('login.ejs')
// })

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }) )

// // route for register
// app.get('/register', checkNotAuthenticated, (req,res) => {
//     res.render('register.ejs')
// })

// app.delete('/logout', function(req, res, next) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/login');
//     });
//   });



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
