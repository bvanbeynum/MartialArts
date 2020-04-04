var path = require("path");
var dataModels = require("./datamodels");

module.exports = function (app) {
	
	app.get("/test", function(request, response) {
		dataModels.page.find(function (error, pages) {
			console.log(pages);
			response.send("Here I Am");
		});
	});
	
	app.get("/*.*", function (request, response) {
		var file = request.path.substring(request.path.indexOf("/") + 1);
		response.sendFile(file, { root: path.join(__dirname, "../client") });
	});
	
	app.get("/*", function(request, response) {
		dataModels.page.find({ url: request.path }, function (error, pages) {
			if (error) {
				response.status(500).send("There was an error retreiving the requested page");
			}
			else if (pages.length != 1) {
				response.status(404).send("Could not find the requested page");
			}
			else {
				response.status(200).sendFile(pages[0].path, { root: path.join(__dirname, "../client") });
			}
		});
	});
	
};
