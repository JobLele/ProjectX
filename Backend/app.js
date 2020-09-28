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
//const MongoURI = "mongodb://localhost:27017/userDB";
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
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to mDB"))
  .catch((e) => console.log("Error :", e));
mongoose.set("useCreateIndex", true);

const employSchema = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  qualification: String,
  appliedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
});
const Employ = mongoose.model("Employ", employSchema);

const jobSchema = new mongoose.Schema({
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
  applicants: [{
    explanation: String,
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employ'
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
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      if (err) {
        res.json({
          err: err.message,
          msg: null,
          obj: null
        });
      }
      var employ = new Employ({
        name: profile.name,
        email: profile.emails[0],
        number: null,
        qualification: "",
        jobsPosted: [],
        appliedFor: []
      });
      employ.save((err, doc) => {
        if (err) {
          res.json({
            err: err.message,
            msg: "null",
            obj: null
          });
        } else {
          res.json({
            err: null,
            msg: "Registration Successfull",
            obj: doc
          });
          return cb(err, user);
        }
      });
    });
  }
));
app.get('/', function(req, res) {
  res.json("Shouldn't be here mfer");
});

app.post("/register", function(req, res) {
  User.register({
    username: req.body.email
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      var employ = new Employ({
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        qualification: "",
        jobsPosted: [],
        appliedFor: []
      });
      employ.save((err, doc) => {
        if (err) {
          res.json({
            err: err.message,
            msg: "null",
            obj: null
          });
        } else {
          res.json({
            err: null,
            msg: "Registration Successfull",
            obj: doc
          });
        }
      });
    }
  });

});

app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.email,
    password: req.body.password
  });
  console.log("in here");
  req.login(user, function(err) {
    console.log(user);
    if (err) {
      console.log(err);
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      if (!req.isAuthenticated()) {
        res.json(
          {
            err: "Can't Authenticate",
            msg: null,
            obj: null
          }
        )
      }
      Employ.findOne({
        email: req.body.email
      }, function(err, employ) {
        if (err) {
          res.json({
            err: err.message,
            msg: null,
            obj: null
          });
        } else {
          if (employ) {
            res.json({
              err: null,
              msg: "Login Successfull",
              obj: employ
            });
          } else {
            res.json({
              err: "No details were saved in DB, contact Administrator",
              msg: null,
              obj: null
            });
          }
        }
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
  res.json({
    err: "Failed to login through google",
    msg: null,
    obj: null
  });
});

app.get("/auth/google/secrets",
  passport.authenticate('google', {
    failureRedirect: "/auth/google"
  }),
  function(req, res) {
    res.end();
  });


app.get('/user/:id', function(req, res) {
  var id = req.params.id;
  Employ.findById(id, function(err, employ) {
    if (err) {
      res.json({
        err : err.message,
        msg : null,
        obj : null
      });
    }
    else {
      if (employ) {
        res.json({
          err : null,
          msg : "Found user by id",
          obj : employ
        });
      }
      else {
        res.json({
          err : err.message,
          msg : null,
          obj : null
        });
      }
    }
  });
});

app.put('/user/:id', function(req, res) {
  var id = req.params.id;
  Employ.findByIdAndUpdate(id, {
    name: req.body.name,
    number: req.body.number,
    qualification: req.body.qualification,
  }, function (err, employ) {
    if (err) {
      res.json({
        err : err.message,
        msg : null,
        obj : null
      });
    }
    else {
      if (employ) {
        res.json({
          err : null,
          msg : "edited user",
          obj : employ
        });
      }
      else {
        res.json({
          err : err.message,
          msg : null,
          obj : null
        });
      }
    }
  });
});

app.delete('/user/:id', function(req, res) {
  var id = req.params.id;
  Employ.findByIdAndDelete(id, function(err, employ) {
    if (err) {
      res.json({
        err : err.message,
        msg : null,
        obj : null
      });
    }
    else {
      if (employ) {
        res.json({
          err : null,
          msg : "deleted user",
          obj : employ
        });
      }
      else {
        res.json({
          err : err.message,
          msg : null,
          obj : null
        });
      }
    }
  })
})

app.get("/logout", function(req, res) {
  req.logOut();
  if (!req.user) {
    res.json({
      err : null,
      msg : "Logged out successfully",
      obj : null
    });
  }
  else {
    res.json({
      err : "Error logging out. Try again",
      msg : null,
      obj : null
    });
  }
})

// Job Routes

app.post("/job", function(req, res) {
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
  job.save((err, doc) => {
    console.log(doc);
    if (err) {
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      Employ.findByIdAndUpdate(req.body.by, {
        $push : {jobsPosted : doc._id}
      }, function(err, updEmp) {
        if (err) {
          res.json(
            {
              err: err.message,
              msg: null,
              obj: null
            }
          );
        }
        else {
              res.json({
                err: null,
                msg: "Created Job Sucessfully",
                obj: doc
              });
        }
      })
    }
  });
});

app.get("/job/:id", function(req, res) {
  var id = req.params.id;
  Job.findById(id, function(err, job) {
    if (err) {
      res.json({err: err.message, msg: null, obj: null});
    }
    else {
      if (!job) {
        res.json({err: "No job with that id exists", msg: "", obj: null})
      }
      else {
            res.json({err: null, msg: "ID Job Procured", obj: job});
      }
    }
  })
});

app.get("/jobs/:offset", function(req, res) {
  var offset = req.params.offset;
  if (offset == null) {
    offset = 0;
  }
  Job.find({}).sort('-postedOn').skip(offset*10).limit(10).exec(function(err, jobs) {
    if (err) {
     
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      
     
      if (jobs.length == 0) {
 
        res.json({
          err: "No jobs exists",
          msg: "",
          obj: null
        })
      } 
      else {
        

        res.json({
          err: null, 
          msg: "ID Job Procured", 
          obj: jobs
        });
      }
    }
  })
});

app.get("/jobs/:filter/:value/:offset", function(req, res) {
  var filter = req.params.filter;
  var value = req.params.value;
  var offset = req.params.offset;
  if (offset == null) {
    offset = 0;
  }
  if (filter == "" || filter == null || value == "" || value == null) {
    res.redirect("/job/" + offset);
  } else {
    search = {
      [filter]: value
    }
    if (filter == "search") {
      search = {
        "search" : {
          $gte : value
        }
      }
    }
    else if (filter == "from") {
      search = {
        "from" : {
          $gte : value
        }
      }
    }
    else if (filter == "to") {
      search = {
        "to" : {
          $lte : value
        }
      }
    }
    Job.find(search).sort('-postedOn').skip(offeset*10).limit(10).exec(function(err, jobs) {
      if (err) {
        res.json({
          err: err.message,
          msg: null,
          obj: null
        });
      } else {
        if (jobs.length == 0) {
          res.json({
            err: "No jobs with that filter exists",
            msg: "",
            obj: null
          })
        } else {
          res.json({
            err: null,
            msg: "All Jobs with that filter are Procured",
            obj: jobs
          });
        }
      }
    });
  }
});

// editing post
app.put("/job/:id", function(req, res) {
  Job.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    salary: req.body.salary,
    description: req.body.description,
    location: req.body.location,
    duration: req.body.duration,
  }, function(err, job) {

    if (err) {
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      res.json({
        err: null,
        msg: "Update Successfull",
        obj: job
      });
    }
  });
});

app.patch("/job/:id", function(req, res) {
  var id = req.params.id;
  if (req.body.applicantID == 0) {
    req.body.explanation += " Phone Number : " + req.body.number;
  }
  Job.findByIdAndUpdate(id, {
    $push: {applicants : {
      explanation : req.body.explanation,
      applicant : req.body.applicantID
    }}
  }, function(err, updJob) {
    if (err) {
      res.json(
        {
          err: err.message,
          msg: null,
          obj: null
        }
      );
    }
    else {
      Employ.findByIdAndUpdate(req.body.applicantID, {
        $push : {appliedFor : updJob._id}
      }, function(err, updEmp) {
        if (err) {
          res.json(
            {
              err: err.message,
              msg: null,
              obj: null
            }
          );
        }
        else {
          res.json({
            err: null,
            msg: "Applied for Job Sucessfully",
            obj: updJob
          });
        }
      })
    }
  })
})

app.delete("/job/:id", function(req, res) {
  var id = req.params.id;
  var job = null;
  Job.findById(req.params.id, function (err, doc) {
    job = doc;
    Job.deleteOne({_id: new mongoose.Types.ObjectId(id)}, function(err, delObj) {
      if (err) {
        res.json(
          {
            err: err.message,
            msg: null,
            obj: null
          }
        );
      }
      else {
        Employ.findByIdAndUpdate(job.postedBy, {
          $pull : { "jobsPosted" : job._id }
        }, function(err, postedBy) {
          if (err) {
            res.json({
              err : "Couldn't delete the id from author's job posted.",
              msg : null,
              obj : null
            });
          }
          else {
            job.applicants.forEach((applicant, index) => {
              Employ.findByIdAndUpdate(applicant.applicant, {
                $pull : { "appliedFor" : job._id }
              }, function(err, applicant) {
                if (err) {
                  res.json({
                    err : "Couldn't delete the id from applicant's job applied for.",
                    msg : null,
                    obj : null
                  });
                }
                else {
                  console.log(applicant._id, job.applicants[job.applicants.length - 1]);
                  if (index == [job.applicants.length - 1].toString()) {
                    res.json({
                      err : null,
                      msg : "Everything is a fucking sucess",
                      obj : delObj
                    })
                  }
                }
              })
            });
          }
        })
      }
    });
  });
});



app.listen(PORT, function() {
  console.log("Server started on port " + PORT.toString());
});
