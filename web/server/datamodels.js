var mongoose = require("mongoose");

var dataModels = {
	page: mongoose.model("page", {
		url: String,
		path: String
	}),
	
	user: mongoose.model("user", {
		user: String,
		password: String,
		firstName: String,
		lastName: String
	}),
	
	student: mongoose.model("student", {
		firstName: String,
		lastName: String,
		fullName: String,
		school: String
	})
};

module.exports = dataModels;