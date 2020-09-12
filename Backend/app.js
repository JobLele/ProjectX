const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get('/', function(req, res) {
  res.json({"msg" : "This is how we roll", "err": "There ain't any yet"});
});

app.get("/secrets", function(req, res){
  let obj = {
    name : "bot",
    uid : "69XX69",
    job : "dilwado"
  }
  res.json({"user" : obj})
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
