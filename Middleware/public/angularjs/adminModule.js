var user = angular.module('adminModule',['xeditable']);
user.controller('adminController',['$scope','$http','$sce', function($scope,$http,$sce){
	/*
	-------Created by Darshil Saraiya 4/27/16-------
	-------Admin login Page operations-------
	*/
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
	//Admin login-page End

	/*
	-------Created by Darshil Saraiya 4/27/16-------
	-------Admin order-list Page operations-------
	*/
	//add order
	$scope.addOrder = function(){
		console.log("addOrder ::");
		$http({
			method : "POST",
			url : "/order/create",
			data : {
				email: "test@email.com"
			}
		}).success(function(res) {
			if(res.status == 200) {
				console.log("success on add order :" + res.data);
				//return;
			}
		});
	}
	//Admin orders-list Page End



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
				$scope.farmerformValidate = false;
				return;
				//$scope.farmers = res.data;
				//return $http.post('/saveUser', data);
			}
		});
	};

	$scope.checkEmail = function(email) {
		console.log(email);
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(!re.test(email)){
			console.log("email invalid");
			return "Email invalid";
		}else{
			return;
		}
	};

	$scope.checkPincode = function(data){
		if (!((new RegExp("/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/")).test(data))){
			return "Pincode invalid";
		}
	}
	
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

	//add farmer
	$scope.addFarmer = function(){
		console.log("addFarmer ::");

		$http({
			method : "POST",
			url : "/admin/addFarmer"
		}).success(function(res) {
			if(res.status == 200) {
				console.log("success on add farmer :" + res.data);
				return;
			}
		});
	}
	//editableOptions.theme = 'bs3';
}]);
