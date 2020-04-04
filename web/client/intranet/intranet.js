var intranetApp = angular.module("intranetApp", ["ngRoute"]);

intranetApp.config(function ($routeProvider, $compileProvider) {
	$compileProvider.debugInfoEnabled(false);
	
	$routeProvider
		.when("/students", {
			templateUrl: "/intranet/views/students.html",
			controller: "studentsCtl"
		})
		.otherwise({
			templateUrl: "/intranet/views/dashboard.html",
			controller: "dashboardCtl"
		});
});

intranetApp.run(function ($http, $window) {
	if (!sessionStorage.authToken || sessionStorage.authToken.length == 0) {
		$window.location.href = "/";
		return;
	}
	else {
		$http.defaults.headers.common.Authorization = "Bearer " + sessionStorage.authToken;
	}
});

intranetApp.controller("navCtl", function ($scope, $location) {
	$scope.searchStudents = function () {
		if ($scope.student && $scope.student.length > 0) {
			$location.path("/students").search({search: $scope.student});
		}
	};
});

intranetApp.controller("dashboardCtl", function($scope) {
});

intranetApp.controller("studentsCtl", function($scope, $routeParams, $http) {
	console.dir($routeParams.search);
	
	$http.post("/api/intranet/getstudents", { search: ($routeParams.search) ? $routeParams.search : ""  })
		.then(
		function (response) {
			console.log(response);
			$scope.students = response.data.students;
		},
		function (response) {
			console.log(response.data.error);
			$scope.students = response.data.students;
		});
})