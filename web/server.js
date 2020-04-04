// Setup =======================================================================

var express = require("express");
var app = express();
var port = process.env.PORT || 7578;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Config =======================================================================

mongoose.connect("mongodb://" + process.env.IP + "/ma");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("x-powered-by", false);
app.set("root", __dirname);

// Routes =======================================================================

require("./server/staticroutes")(app);
require("./server/apiroutes")(app);

// listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);
