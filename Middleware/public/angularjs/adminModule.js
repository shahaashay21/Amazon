var user = angular.module('adminModule',['xeditable']);
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


	$scope.saveFarmer = function(data, id) {
    //$scope.user not updated yet
	    angular.extend(data, {id: id});
	    console.log("saveFarmer data::");
	    console.log(data);
	    $http({
			method : "POST",
			url : '/farmer/edit',
			data: {
				f_id : id,
				fname: data.fname,
				lname: data.lname,
				email: data.email,
				address: data.address
			}
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on save farmer" + res.data);
				return;
				//$scope.farmers = res.data;
				//return $http.post('/saveUser', data);
			}
		});
  	};

	// remove farmer
	$scope.removeFarmer = function(id) {
		//$scope.farmers.splice(index, 1);
		console.log("removeFarmer ::");
		console.log(id);
		$http({
			method : "DELETE",
			url : '/farmer/delete',
			params: {
				f_id : id
			}
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on remove farmer" + res.data);
				return;
				//$scope.farmers = res.data;
			}
		});
	};



	$scope.saveProduct = function(data, id) {
    //$scope.user not updated yet
	    angular.extend(data, {id: id});
	    console.log("saveProduct data::");
	    console.log(data);
	    $http({
			method : "POST",
			url : '/product/edit',
			data: {
				p_id : id,
				name: data.name,
				cat_id: data.cat_id,
				price: data.price,
				weight: data.weight,
				details: data.details,
				unit: data.unit
			}
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on save product" + res.data);
				$scope.getproducts();
				return;
				//$scope.products = res.data;
				//return $http.post('/saveUser', data);
			}
		});
  	};

	// remove product
	$scope.removeProduct = function(id) {
		//$scope.products.splice(index, 1);
		console.log("removeProduct ::");
		console.log(id);
		$http({
			method : "DELETE",
			url : '/product/delete',
			params: {
				p_id : id
			}
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on remove product" + res.data);
				return;
				//$scope.products = res.data;
			}
		});
	};
	//editableOptions.theme = 'bs3';
}]);
