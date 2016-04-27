var adminloginapp = angular.module('adminloginapp',[]);

adminloginapp.controller('adminlogincontroller', function($scope, $http) {

	$scope.isBlankEmail = false;
	$scope.isBlankPassword = false;
	$scope.isIncorrectDetails = false;

	$scope.loginSubmit = function() {
		
		$scope.isBlankEmail = false;
		$scope.isBlankPassword = false;
		$scope.isIncorrectDetails = false;		

		if($scope.email == '')
			$scope.email = null;

		if($scope.pass == '')
			$scope.pass = null;

		if ($scope.email == null) {
			
			$scope.isBlankEmail = true;
			$scope.isBlankPassword = false;
		} else if ($scope.email != null && $scope.pass == null){
			$scope.isBlankPassword = true;
		}

		if($scope.email != null && $scope.pass != null){
			//Check Login Credentials
			$http({
				method : "POST",
				url : "/admin/checkLogin",
				data : {
					"email" : $scope.email,
					"pass" : $scope.pass
				}
			}).success(function(data) {
				if(data.statusCode == 200){
					console.log("login successful!");
					//Assigning the page to admin homepage
					window.location.assign('/admin/home');
				} else if(data.statusCode == 401) {
					console.log("login unsuccessful!");
					console.log("Error : " + data.error);
					$scope.isBlankEmail = false;
					$scope.isBlankPassword = false;
					$scope.isIncorrectDetails = true;
				}
			}).error(function(error){
				console.log("Error requesting server : " + error);
			});
		}
	}
});