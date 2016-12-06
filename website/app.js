var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./routes/index");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.listen(PORT, function () {
  console.log("Application running on port:", PORT);
});
