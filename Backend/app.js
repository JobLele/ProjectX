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
// const Cookies = require('universal-cookie');
// const cookieParser = require('cookie-parser');
// const cookiesMiddleware = require('universal-cookie-express');
//const MongoURI = "mongodb://localhost:27017/userDB";
const PORT = process.env.PORT || 2000;
const app = express();
// const router = express.Router();
// app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

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
  .then(() => {
    console.log("Connected to mDB");
    var nulla = new Employ({
      _id : new mongoose.mongo.ObjectID("000000000000000000000000")
    });
    nulla.save((err, doc) => {
    })
  })
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
  dur : String,
  state : String,
  region : String,
  duration: [String],
  start : Date,
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
jobSchema.index({'$**': 'text'});
const Job = mongoose.model("Job", jobSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

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

app.post("/register", async function(req, res) {
  User.register({
    username: req.body.email
  }, req.body.password, async function(err, user) {
    if (err) {
      console.log(err);
      res.json({
        err: err.message,
        msg: null,
        obj: null
      });
    } else {
      const {
        user
      } = await User.authenticate()(req.body.email, req.body.password.toString());
      if (user == false) {
        res.json({
          err: "Couldn't Authenticate",
          msg: null,
          obj: null
        });
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
    }
  });

});

app.post("/login", async function(req, res) {

  const {
    user
  } = await User.authenticate()(req.body.email, req.body.password.toString());

  if (user == false) {
    res.json({
      err: "Can't Authenticate",
      msg: null,
      obj: null
    });
  }
  else {
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


  // const user = new User({
  //   username: req.body.email,
  //   password: req.body.password
  // });
  // req.login(user, function(err) {
  //   if (err) {
  //     console.log(err);
  //     res.json({
  //       err: err.message,
  //       msg: null,
  //       obj: null
  //     });
  //   } else {
  //     if (!req.isAuthenticated()) {
  //       res.json(
  //         {
  //           err: "Can't Authenticate",
  //           msg: null,
  //           obj: null
  //         }
  //       )
  //     }
  //     Employ.findOne({
  //       email: req.body.email
  //     }, function(err, employ) {
  //       if (err) {
  //         res.json({
  //           err: err.message,
  //           msg: null,
  //           obj: null
  //         });
  //       } else {
  //         if (employ) {
  //           res.json({
  //             err: null,
  //             msg: "Login Successfull",
  //             obj: employ
  //           });
  //         } else {
  //           res.json({
  //             err: "No details were saved in DB, contact Administrator",
  //             msg: null,
  //             obj: null
  //           });
  //         }
  //       }
  //     });
  //   }
  // });
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
  if (id == 0) return;
  Employ.findById(id).populate('jobsPosted').populate('appliedFor').exec(function(err, employ) {
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
          err : "User not found",
          msg : null,
          obj : null
        });
      }
    }
  });
});

app.put('/user/:id', function(req, res) {
  var id = req.params.id;
  if (id == 0) return;
  Employ.findByIdAndUpdate(id, {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
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
        User.findOneAndUpdate({username : employ.email}, {username : req.body.email}, function (err, user) {
          if (err) {
            res.json({
              err : err.message,
              msg : null,
              obj : employ
            });
          }
          else {
            res.json({
              err : null,
              msg : "edited user",
              obj : employ
            });
          }
        })
    }
  });
});

app.delete('/user/:id', function(req, res) {
  var id = req.params.id;
  if (id == 0) return;
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
    dur : req.body.dur.value,
    state : req.body.state,
    region : req.body.region,
    duration: [req.body.from, req.body.to],
    postedBy: req.body.by,
    applicants: []
  });
  job.save((err, doc) => {
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
  Job.findById(id).populate("applicants.applicant").exec(function(err, job) {
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


app.post("/jobs/filter/:offset", function(req, res) {
  console.log(req.body);
  var search = {}
  var offset = req.params.offset;
  if (offset == null) {
    offset = 0;
  }
  if (req.body.title != "") {
    search.$text = {
      $search : req.body.title
    }
  }
  if (req.body.salary != 0) {
    search["salary"] = {
      $gte : req.body.salary
    }
  }
  if (req.body.state != "") {
    search["state"] = req.body.state

  }
  if (req.body.region != "") {
    search["region"] = req.body.region

  }
  if (req.body.from != "") {
    search["duration.0"] = {
      $gte : new Date(Date.parse(req.body.from))
    }
  }
  if (req.body.to != "") {
    search["duration.1"] = {
      $lte : new Date(Date.parse(req.body.to))
    }
  }
  if (req.body.dur != "") {
    search["dur"] = req.body.dur
  }
  Job.find(search).sort('-postedOn').skip(offset*10).limit(10).exec(function(err, jobs) {
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


})

// app.get("/jobs/:filter/:value/:offset", function(req, res) {
//   var filter = req.params.filter;
//   var value = req.params.value;
//   var offset = req.params.offset;
//   if (offset == null) {
//     offset = 0;
//   }
//   if (filter == "" || filter == null || value == "" || value == null) {
//     res.redirect("/job/" + offset);
//   } else {
//     search = {
//       [filter]: value
//     }
//     if (filter == "title") {
//       search = {
//         $text : {
//           $search : value
//         }
//       }
//     }
//     if (filter == "salary") {
//       search = {
//         "salary" : {
//           $gte : value
//         }
//       }
//     }
//     if (filter == "state") {
//       search = {
//         "state" : { value  }
//       }
//     }
//     if (filter == "region") {
//       search = {
//         "region" : { value  }
//       }
//     }
//     if (filter == "from") {
//       search = {
//         "duration.0" : {
//           $gte : new Date(Date.parse(value))
//         }
//       }
//     }
//     if (filter == "to") {
//       search = {
//         "duration.1" : {
//           $lte : new Date(Date.parse(value))
//         }
//       }
//     }
//     Job.find(search).sort('-postedOn').skip(offset*10).limit(10).exec(function(err, jobs) {
//       if (err) {
//         res.json({
//           err: err.message,
//           msg: null,
//           obj: null
//         });
//       } else {
//         if (jobs.length == 0) {
//           res.json({
//             err: "No jobs with that filter exists",
//             msg: "",
//             obj: null
//           })
//         } else {
//           res.json({
//             err: null,
//             msg: "All Jobs with that filter are Procured",
//             obj: jobs
//           });
//         }
//       }
//     });
//   }
// });

// editing post
app.put("/job/:id", function(req, res) {
  Job.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    salary: req.body.salary,
    description: req.body.description,
    state : req.body.state,
    region : req.body.region,
    dur : req.body.dur,
    duration: [req.body.from, req.body.to],
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


//applicants
app.patch("/job/:id", function(req, res) {
  var id = req.params.id;
  // if (req.body.applicantID == 0) {
  //   req.body.explanation += " Phone Number : " + req.body.number;
  // }
  if (req.body.applicantID) {
    Job.findByIdAndUpdate(id, {
      $pull: {applicants : {
        applicant : req.body.applicantID
      }}
    }, function(err, job) {
      if (err) {
        res.json({
          err : err.message,
          msg : null,
          obj : null
        });
      }
      return;
    })
  }
  Job.findByIdAndUpdate(id,{
    $push: {applicants : {
      explanation : req.body.explanation,
      applicant : new mongoose.mongo.ObjectID(req.body.applicantID)
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
      if (req.body.applicantID == 0) {
        res.json(
          {
            err: null,
            msg: null,
            obj: updJob
          }
        );
        return;
      }
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
  Job.findById(id, function (err, doc) {
    job = doc;
    Job.deleteOne({_id: new mongoose.Types.ObjectId(id)}, function(err, delObj) {
      if (err) {
        console.log("1");
        res.json(
          {
            err: err.message,
            msg: null,
            obj: null
          }
        );
      }
      else {
        console.log("1.5");
        Employ.findByIdAndUpdate(job.postedBy, {
          $pull : { "jobsPosted" : job._id }
        }, function(err, postedBy) {
          if (err) {
            console.log("2");
            res.json({
              err : "Couldn't delete the id from author's job posted.",
              msg : null,
              obj : null
            });
            return;
          }
          else {
            console.log("2.5");
            console.log(job.applicants);
            if (job.applicants.length == 0 || job.applicants == null) {
              console.log("3");
              res.json({
                err : null,
                msg : "No Applicants to be deleted",
                obj : delObj
              })
              return;
            }
            else {
              job.applicants.forEach((applicant, index) => {
                Employ.findByIdAndUpdate(applicant.applicant, {
                  $pull : { "appliedFor" : job._id }
                }, function(err, applicant) {
                  if (err) {
                    console.log("4");
                    res.json({
                      err : "Couldn't delete the id from applicant's job applied for.",
                      msg : null,
                      obj : null
                    });
                    return;
                  }
                  else {
                    if (index == job.applicants.length - 1) {
                      console.log("5");
                      res.json({
                        err : null,
                        msg : "Everything is a fucking sucess",
                        obj : job
                      })
                      return;
                    }
                  }
                })
              });

            }
          }
        })
      }
    });
  });
});



app.listen(PORT, function() {
  console.log("Server started on port " + PORT.toString());
});
