var signinApp = angular.module("signinApp", []);

signinApp.controller("signinCtl", function ($scope, $http, $window) {
	$scope.isProcessing = false;
	
	$scope.signin = function () {
		$scope.isProcessing = true;
		
		$http.post("/api/signin/login", { user: $scope.user, password: $scope.password })
			.then(
			function (response) {
				if (response.data.login == true) {
					sessionStorage.authToken = response.data.jwt;
					$window.location.href = "/intranet";
				}
				else {
					$scope.errorMessage = data.message;
					$scope.isProcessing = false;
				}
			},
			function (data) {
				$scope.errorMessage = data.message;
				console.log(data.error);
				$scope.isProcessing = false;
			});
	};
});
