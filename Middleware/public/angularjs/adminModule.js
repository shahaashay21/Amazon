var user = angular.module('adminModule',[]);
user.controller('adminController',['$scope','$http','$sce', function($scope,$http,$sce){
	
	$scope.getfarmers = function(){
		$http({
			method : "GET",
			url : '/farmer/all'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getfarmers" + res.data);
				$scope.farmers = res.data;
			}
		});
	}
	
	$scope.getproducts = function(){
		$http({
			method : "GET",
			url : '/product/all',
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getproducts" + res.data);
				$scope.products = res.data;
			}
		});
	}
}]);