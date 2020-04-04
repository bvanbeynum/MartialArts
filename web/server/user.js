var dataModels = require("./datamodels");

module.exports = {
	
	getUserById: function (id, callback) {
			dataModels.user.find({_id: id}, function (error, users) {
				if (error) {
					callback(error, {});
				}
				else if (users.length == 1) {
					callback(error, users[0]);
				}
				else {
					callback(error, {});
				}
			});
		}
	
};