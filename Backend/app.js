
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const MongoURI = process.env.MongoURI || "mongodb://localhost:27017/userDB";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "projectXJobLele.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to mDB"))
.catch((e) => console.log("Error :", e));
mongoose.set("useCreateIndex", true);

const employeeSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  qualification: String,
  appliedFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
});
const Employee = mongoose.model("Employee", employeeSchema);

const employerSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
});
const Employer = mongoose.model("Employer", employerSchema);

const jobSchema = new mongoose.Schema ({
  title: String,
  type: String,
  description: String,
  salary : Number,
  location : String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer'
  },
  postedOn: Date,
  applicants: [
    {
      explanation: String,
      applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
      }
    }
  ]
});
const Job = mongoose.model("Job", jobSchema);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/secrets`,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', function(req, res) {
  res.json("Shouldn't be here mfer");
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.json({err : err, msg: null, obj: null});
    } else {
      passport.authenticate("local")(req, res, function(){
        // create employee/employer detail into db and send in res.json
        res.json({err : null, msg: "Registration Successfull", obj: null});
      });
    }
  });

});

app.post("/login", function(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.json({err : err, msg: null, obj: null});
    } else {
      passport.authenticate("local")(req, res, function(){
        // get employee/employer detail from db and send in res.json
        res.json({err : null, msg: "Login Successfull", obj: null});
      });
    }
  });
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/loginfail", function(req, res) {
  res.json({err: "Failed to login through google", msg: "", obj: null});
});

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/loginfail" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    // get employee/employer detail from db and send in res.json
    res.json({err: null, msg: "successfully loggedin", obj: null});
});


app.listen(PORT, function() {
  console.log("Server started on port " + PORT.toString());
});
