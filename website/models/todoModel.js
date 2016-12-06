var mongoose = require("mongoose");

var Todo = mongoose.Schema({
	text: String,
	completed: Boolean
});

module.exports = mongoose.model("Todo", Todo);
