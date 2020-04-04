var dataModels = require("./datamodels");
var jwt = require("jsonwebtoken");
var secret = "BrettCode";

module.exports = function (app) {
	
	app.post("/api/signin/login", function (request, response) {
		if (request.body.user && request.body.password) {
			var filter = {
				user: request.body.user,
				password: request.body.password
			};
			
			dataModels.user.find(filter).exec()
				.then(function (users) {
					if (users.length == 1) {
						var token = jwt.sign({ id: users[0]._id }, secret);
						
						response.status(200).send({login: true, jwt: token});
					}
					else {
						response.status(200).send({login: false, message: "Invalid Login"});
					}
				})
				.catch(function (error) {
					response.status(500).send({login: false, message:"Invalid Login", error: error});
				});
		}
		else {
			response.status(200).send({login: false, message: "Invalid Login"});
		}
	});
	
	app.post("/api/intranet/getstudents", function (request, response) {
		if (request.headers && request.headers.authorization) {
			var token = authenticate(request.headers.authorization);
			
			if (token == false) {
				response.status(403).send("Unauthorized");
				return;
			}
		}
		else {
			response.status(403).send("Unauthorized");
			return;
		}
		
		if (request.body.search && request.body.search.length > 0) {
			var filter = {
				$and: request.body.search.split(" ").map(function (word) { 
					return {
						fullName: {$regex: "[ ]*(" + word + ")", $options: "gi" }
					};
				})
			};
		}
		else {
			filter = {};
		}
		
		dataModels.student.find(filter).exec()
			.then(function (students) {
				response.status(200).send({
					students: students.map(function (student) {
						return {
							firstName: student.firstName,
							lastName: student.lastName,
							fullName: student.fullName,
							school: student.school
						};
					})
				});
			})
			.catch(function (error) {
				response.status(500).send({students: [], error: error});
			});
	});
	
	function authenticate(authHeader) {
		var parts = authHeader.split(" ");
		
		if (parts.length == 2 && parts[0].toString().toLowerCase() == "bearer") {
			try {
				var token = jwt.verify(parts[1], secret);
				return token;
			}
			catch (ex) {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
};
