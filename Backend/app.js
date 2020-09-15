
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
const PORT = process.env.PORT || 2000;
const app = express();
console.log(process.env.MongoURI);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

const employSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  qualification: String,  
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  appliedFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
});
const Employ = mongoose.model("Employ", employSchema);

const jobSchema = new mongoose.Schema ({
  title: String,
  salary: Number,
  description: String,
  postedOn: Date,
  location: [Number],
  duration: [Date],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employ'
  },
  applicants: [
    {
      explanation: String,
      applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employ'
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
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      if (err) {
        res.json({err: err.message, msg: null, obj: null});
      }
      var employ = new Employ({
        name: profile.name,
        email: profile.emails[0],
        number: null,
        qualification: "",
        jobsPosted: [],
        appliedFor: []
      });
      employ.save( (err, doc) => {
        if (err) {
          res.json({err : err.message, msg: "null", obj: null});
        }
        else {
          res.json({err : null, msg: "Registration Successfull", obj: doc});
          return cb(err, user);
        }
      });
    });
  }
));

app.get('/', function(req, res) {
  res.json("Shouldn't be here mfer");
});

app.post("/register", function(req, res){
  User.register({email: req.body.email}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.json({err : err.message, msg: null, obj: null});
    } 
    else {
      var employ = new Employ({
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        qualification: "",
        jobsPosted: [],
        appliedFor: []
      });
      employ.save( (err, doc) => {
        if (err) {
          res.json({err : err.message, msg: "null", obj: null});
        }
        else {
          res.json({err : null, msg: "Registration Successfull", obj: doc});
        }
      });
    }
  });

});

app.post("/login", function(req, res){
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.json({err : err.message, msg: null, obj: null});
    } else {
      passport.authenticate("local")(req, res, function(){
        Employ.findOne({email : req.body.email}, function(err, employ) {
          if (err) {
            res.json({err: err.message, msg: null, obj: null});
          }
          else {
            if (employ) {
              res.json({err: null, msg: "Login Successfull", obj: employ});
            }
            else {
              res.json({err: "No details were saved in DB, contact Administrator", msg: null, obj: null});
            }
          }
        });
      });
    }
  });
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/loginfail", function(req, res) {
  res.json({err: "Failed to login through google", msg: null, obj: null});
});

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/auth/google" }),
  function(req, res) {
    res.end();
});

// Job Routes
app.get("/job/:offset", function(req, res) {
  var offset = req.params.offset;
  if (offset == null) {
    offset = 0;
  }
  Job.find({}, function (err, jobs) {
    if (err) {
      res.json({err: err.message, msg: null, obj: null});
    }
    else {
      if (jobs.length == 0) {
        res.json({err: "No jobs exists", msg: "", obj: null})
      }
      else {
        res.json({err: null, msg: "All Jobs Procured", obj: jobs});
      }
    }
  }).skip(offset * 10).limit(10);
});

app.get("/job/:filter/:value/:offset", function(req, res) {
  var filter = req.params.filter;
  var value = req.params.value;
  var offset = req.params.offset;
  if (offset == null) {
    offset = 0;
  }
  if (filter == "" || filter == null || value == "" || value == null) {
    res.redirect("/job/" + offset);
  }
  else {
    Job.find({[filter]: value}, function(err, jobs) {
      if (err) {
        res.json({err: err.message, msg: null, obj: null});
      }
      else {
        if (jobs.length == 0) {
          res.json({err: "No jobs with that filter exists", msg: "", obj: null})
        }
        else {
          res.json({err: null, msg: "All Jobs with that filter are Procured", obj: jobs});
        }
      }
    }).skip(offset * 10).limit(10);
  }
});

app.post("/newjob", function(req, res) {
  var job = new Job({
    title: req.body.title,
    salary: req.body.salary,
    description: req.body.description,
    postedOn: new Date,
    location: [req.body.x, req.body.y],
    duration: [req.body.from, req.body.to],
    postedBy: req.body.by,
    applicants: []
  })
  job.save( (err, doc) => {
    if (err) {
      res.json({err: err.message, msg: null, obj: null});
    }
    else {
      res.json({err: null, msg: "Created Job Sucessfully", obj: doc});
    }
  })
})


app.listen(PORT, function() {
  console.log("Server started on port " + PORT.toString());
});
