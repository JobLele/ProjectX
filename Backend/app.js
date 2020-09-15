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
// const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use("/", router);

app.use(session({
  secret: "projectXJobLele.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to mDB"))
  .catch((e) => console.log("Error :", e));
mongoose.set("useCreateIndex", true);

const employSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
<<<<<<< HEAD
  qualification: String,
  appliedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
});
const Employee = mongoose.model("Employee", employeeSchema);

const employerSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
=======
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
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
});
const Employ = mongoose.model("Employ", employSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  salary: Number,
  description: String,
<<<<<<< HEAD
  location : [Number],
  salary : Number,
=======
  postedOn: Date,
  location: [Number],
  duration: [Date],
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employ'
  },
<<<<<<< HEAD
  postedOn: Date,
  applicants: [{
    explanation: String,
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
=======
  applicants: [
    {
      explanation: String,
      applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employ'
      }
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
    }
  }]
});
const Job = mongoose.model("Job", jobSchema);

const userSchema = new mongoose.Schema({
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
<<<<<<< HEAD
    console.log(profile);

    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
=======
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
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
    });
  }
));

app.get('/', function(req, res) {
  res.json("Shouldn't be here mfer");
});

<<<<<<< HEAD
app.post("/register", function(req, res) {
  User.register({
    username: req.body.email
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.json({
        err: err,
        msg: null,
        obj: null
      });
    } else {
      // create employee/employer detail into db and send in res.json
      let fakeObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      res.json({
        err: null,
        msg: "Registration Successfull",
        obj: fakeObj
=======
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
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
      });
    }
  });

});

app.post("/login", function(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
<<<<<<< HEAD
      res.json({
        err: err,
        msg: null,
        obj: null
      });
    } else {
      passport.authenticate("local")(req, res, function() {
        // get employee/employer detail from db and send in res.json
        res.json({
          err: null,
          msg: "Login Successfull",
          obj: null
=======
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
>>>>>>> 203f400974d81074533882e517bc3eb151af66b4
        });
      });
    }
  });
});

app.post("/job", function(req, res) {
const job = new Job({
  title: req.body.title,
  type: req.body.type,
  description: req.body.description,
  postedBy: req.body.postedBy,
  postedOn: req.body.postedOn,
  applicants: req.body.applicants,
  salary : req.body.salary,
  location : req.body.location
});

req.job(user, function(err) {
    if (err) {
      console.log(err);
      res.json({
        err: err,
        msg: null,
        obj: null
      });
    } else {

      res.json({
        err: null,
        msg: "job details acquired",
        obj: fakeObj
      });

}
});
});

app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile"]
  })
);

app.get("/loginfail", function(req, res) {
<<<<<<< HEAD
  res.json({
    err: "Failed to login through google",
    msg: "",
    obj: null
  });
});

app.get("/auth/google/secrets",
  passport.authenticate('google', {
    failureRedirect: "/loginfail"
  }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    // get employee/employer detail from db and send in res.json
    res.json({
      err: null,
      msg: "successfully loggedin",
      obj: null
    });
  });
// router.route("/homepage").get(function(req, res) {
//   User.find({}, function(err, User) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(User);
//     }
//   });
// });
=======
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

>>>>>>> 203f400974d81074533882e517bc3eb151af66b4

app.listen(PORT, function() {
  console.log("Server started on port " + PORT.toString());
});
