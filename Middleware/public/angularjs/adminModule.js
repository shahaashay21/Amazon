var user = angular.module('adminModule',['xeditable','ngFileUpload']);
//,'ngFileUpload'
user.directive('addFarmerModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   } 
});

user.directive('addProductModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   } 
});


user.controller('adminController',['$scope','$http','$sce','$filter', 'Upload', function($scope,$http,$sce,$filter, Upload){
	//, 'Upload' //Upload
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
	//Admin orders-list Page Operations End

	/*
	-------Created by Darshil Saraiya 4/30/16-------
	-------Admin trucks-list Page operations-------
	*/
	//get all trucks
	
	$scope.getTrucks = function(){
		console.log("getTrucks ::");
		$http({
			method : "GET",
			url : '/truck/all'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on gettrucks" + res.data);
				$scope.trucks = res.data;
			}
		});
	}
	

	//add truck
	$scope.invalid_field = false;
	$scope.unexpected_error = false;
	$scope.truck_exist = false;
	$scope.addTruck = function(){
		console.log("addTruck ::");
		
		$scope.invalid_field = false;
		$scope.unexpected_error = false;
		$scope.truck_exist = false;

		//if($scope.number.length == 7){
		if(typeof $scope.number != 'undefined'){
			$http({
				method : "POST",
				url : "/truck/create",
				data : {
					number : $scope.number.toUpperCase() 
				}
			}).success(function(res) {
				if(res.status == 200) {
					console.log("success on add truck");
					$scope.getTrucks(); //getting latest truck data again
				} else if(res.status == 401) {
					console.log("error :: " + res.error);
					if(res.error == "Truck Exists")
						$scope.truck_exist = true;
					else
						$scope.unexpected_error = true;
				}
			}).error(function(error) {
				console.log("error :: " + error);
				$scope.unexpected_error = true;
			});
		} else {
			$scope.invalid_field = true;
			return;
		}
	}

	//save Truck
	$scope.saveTruck = function(data, id) {
	//$scope.user not updated yet
		angular.extend(data, {id: id});
		console.log("saveTruck data::");
		console.log(data);
		if(data.number && id) {
			if(data.number.length == 7 && id.length == 9){
				$http({
					method : "POST",
					url : '/truck/edit',
					data: {
						t_id : id,
						number: data.number.toUpperCase()
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on save truck" + res.data);
						$scope.truckformValidate = false;
						getTrucks();
						return;
					} else if(res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);
					}
				}).error(function(error) {
					console.log("error : " + error);
				});
			}
		}
	};

	// remove truck
	$scope.removeTruck = function(id) {
		
		console.log("removeTruck ::");
		console.log(id);
		if(id) {
			if(id.length == 9){
				$http({
					method : "DELETE",
					url : '/truck/delete',
					params: {
						t_id : id
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on remove truck" + res.data);
						getTrucks();
						return;
					} else if (res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);	
					}
				}).error(function(error) {
					console.log("error :: " + error);
				});
			}
		}
	};

	//validating the number while calling editTruck
	$scope.checkNumber = function(number) {
		console.log("number :: " + number);

		if(number){
			if(number.length == 7)
				return;
			else
				return "Invalid Truck Number!";
		}
		else
			return "Empty Truck Number!";
	}
	/*
		Admin truck-list Page Operations End
	*/

	/*
	-------Created by Darshil Saraiya 4/30/16-------
	-------Admin drivers-list Page operations-------
	*/
	
	$scope.getDrivers = function(){
		console.log("getDrivers ::");
		$http({
			method : "GET",
			url : '/driver/all'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getdrivers : " + res.data);
				$scope.drivers = res.data;
			}
		});
	}

	//add driver
	//$scope.invalid_t_id = false;
	//$scope.unexpected_error = false;
	//$scope.driver_exist = false;
	$scope.addDriver = function(){
		console.log("addDriver ::");
		
		/*$scope.invalid_t_id = false;
		console.log(Number($scope.t_id));
		console.log(angular.isNumber($scope.t_id));
		
		if(!$scope.t_id || $scope.t_id.length!=9 || Number($scope.t_id)) {
			$scope.invalid_t_id = true;
			return;
		}

		if($scope.fname || $scope.fname.length <= 0) {

			return;
		}*/
		console.log("t_id : " + $scope.t_id);
		var newDriver = [
			{
				"t_id" : $scope.t_id.toUpperCase(),
				"fname" : $scope.fname,
				"lname" : $scope.lname,
				"email" : $scope.email,
				"address" : $scope.address,
				"city" : $scope.city,
				"state" : $scope.state,
				"zipCode" : $scope.zipCode,
				"contacts" : Number($scope.contacts)
			}
		];

		//if($scope.number.length == 7){
		//if(typeof $scope.number != 'undefined'){
			$http({
				method : "POST",
				url : "/driver/create",
				data : {
					"newDriver" : newDriver
				}
			}).success(function(res) {
				if(res.status == 200) {
					console.log("success on add driver");
					$scope.getDrivers(); //getting latest driver data again
				} else if(res.status == 401) {
					console.log("error :: " + res.error);
					if(res.error == "Driver Exists")
						$scope.driver_exist = true;
					else
						$scope.unexpected_error = true;
				}
			}).error(function(error) {
				console.log("error :: " + error);
				$scope.unexpected_error = true;
			});
		//} else {
		//	$scope.invalid_field = true;
		//	return;
		//}
	}

	//save Truck
	$scope.saveDriver = function(data, id) {
	//$scope.user not updated yet
		angular.extend(data, {id: id});
		console.log("saveDriver data::");
		console.log(data);
		//if(data && id) {
			//if(data.number.length == 7 && id.length == 9){
				$http({
					method : "POST",
					url : '/driver/edit',
					data: {
						driver_id : id,
						t_id : data.t_id.toUpperCase(),
						fname : data.fname,
						lname : data.lname,
						email : data.email,
						address : data.address,
						city : data.city,
						state : data.state,
						zipCode : data.zipCode,
						contacts : data.contacts
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on save driver" + res.data);
						$scope.driverformValidate = false;
						$scope.getDrivers();
						return;
					} else if(res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);
					}
				}).error(function(error) {
					console.log("error : " + error);
				});
			//}
		//}
	};

	// remove driver
	$scope.removeDriver = function(id) {
		
		console.log("removeDriver ::");
		
		if(id) {
			//if(Number(id).length == 9){
				console.log("remove driver call");
				$http({
					method : "DELETE",
					url : '/driver/delete',
					params: {
						driver_id : id
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on remove driver" + res.data);
						$scope.getDrivers();
						return;
					} else if (res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);	
					}
				}).error(function(error) {
					console.log("error :: " + error);
				});
			//}
		}
	};

	//validating the number while calling editTruck
	$scope.checkFirstName = function(fname) {
		console.log("fname :: " + fname);

		if(fname){
			/*if(number.length == 7)
				return;
			else
				return "Invalid Truck Number!";*/
		}
		else
			return "Empty First Name!";
	}
	/*
		Admin drivers-list page Operations end
	*/

	/*
	-------Created by Darshil Saraiya 5/01/16-------
	-------Admin customers-list Page operations-------
	*/
	
	$scope.getCustomers = function(){
		console.log("getCustomers ::");
		$http({
			method : "GET",
			url : '/customer/all'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getcustomers : " + res.data);
				$scope.customers = res.data;
			}
		});
	}

	//add customer
	//$scope.invalid_t_id = false;
	//$scope.unexpected_error = false;
	$scope.customer_exist = false;
	$scope.addCustomer = function(){
		console.log("addCustomer ::");
		$scope.customer_exist = false;
		/*$scope.invalid_t_id = false;
		console.log(Number($scope.t_id));
		console.log(angular.isNumber($scope.t_id));
		
		if(!$scope.t_id || $scope.t_id.length!=9 || Number($scope.t_id)) {
			$scope.invalid_t_id = true;
			return;
		}

		if($scope.fname || $scope.fname.length <= 0) {

			return;
		}*/
		
		var newCustomer = [
			{
				"fname" : $scope.fname,
				"lname" : $scope.lname,
				"email" : $scope.email,
				"pass" : $scope.pass,
				"address" : $scope.address,
				"city" : $scope.city,
				"state" : $scope.state,
				"zipcode" : Number($scope.zipcode),
				"card_number" : Number($scope.card_number),
				"name_on_card" : $scope.name_on_card,
				"exp_month" : Number($scope.exp_month),
				"exp_year" : Number($scope.exp_year),
				"cvv" : Number($scope.cvv),
				"contact" : $scope.contact
			}
		];

		//if($scope.number.length == 7){
		//if(typeof $scope.number != 'undefined'){
			$http({
				method : "POST",
				url : "/customer/create",
				data : {
					"newCustomer" : newCustomer
				}
			}).success(function(res) {
				if(res.status == 200) {
					console.log("success on add customer");
					$scope.getCustomers(); //getting latest driver data again
				} else if(res.status == 401) {
					console.log("error :: " + res.error);
					if(res.error == "Customer Exists")
						$scope.customer_exist = true;
					else
						$scope.unexpected_error = true;
				}
			}).error(function(error) {
				console.log("error :: " + error);
				$scope.unexpected_error = true;
			});
		//} else {
		//	$scope.invalid_field = true;
		//	return;
		//}
	}

	//save Customer
	$scope.saveCustomer = function(data, id) {
	//$scope.user not updated yet
		angular.extend(data, {id: id});
		console.log("saveCustomer data::");
		console.log(data);
		//if(data && id) {
			//if(data.number.length == 7 && id.length == 9){
				$http({
					method : "POST",
					url : '/customer/edit',
					data: {
						c_id : id,
						fname : data.fname,
						lname : data.lname,
						email : data.email,
						address : data.address,
						city : data.city,
						state : data.state,
						zipcode : data.zipcode,
						contact : data.contact
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on save customer" + res.data);
						$scope.customerformValidate = false;
						$scope.getCustomers();
						return;
					} else if(res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);
					}
				}).error(function(error) {
					console.log("error : " + error);
				});
			//}
		//}
	};
	// remove customer
	$scope.removeCustomer = function(id) {
		
		console.log("removeCustomer ::");
		
		if(id) {
			//if(Number(id).length == 9){
				console.log("remove customer call");
				$http({
					method : "DELETE",
					url : '/customer/delete',
					params: {
						c_id : id
					}
				}).success(function(res){
					if (res.status === 200) {
						console.log("success on remove customer" + res.data);
						$scope.getCustomers();
						return;
					} else if (res.status == 401) {
						console.log("error :: " + res.error);
						window.alert("Error : " + res.error);	
					}
				}).error(function(error) {
					console.log("error :: " + error);
				});
			//}
		}
	};

	//validating the number while calling editTruck
	$scope.checkFirstName = function(fname) {
		console.log("fname :: " + fname);

		if(fname){
			/*if(number.length == 7)
				return;
			else
				return "Invalid Truck Number!";*/
		}
		else
			return "Empty First Name!";
	}
	/*
		Admin customers-list page Operations end
	*/


	/*
	-------Created by Darshil Saraiya 4/30/16-------
	-------Admin orders-list Page operations-------
	*/
	$scope.isButtonClicked = false;
	$scope.isPendingClicked = false;
	$scope.isInProgressClicked = false;
	$scope.isCompleteClicked = false;
	$scope.isCancelClicked = false;
	
	$scope.getPending = function() {
	$scope.isButtonClicked = true;
	$scope.isPendingClicked = true;
	$scope.isInProgressClicked = false;
	$scope.isCompleteClicked = false;
	$scope.isCancelClicked = false;
		console.log("getPending");

		$http({
			method : "POST",
			url : '/order/pending'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getPending : " + res.data);
				$scope.orders = res.data;
			}
		});
	}

	$scope.isDriverIDValid = false;
	$scope.assignDriverId = function(o_id, driver_id) {
		
		console.log("o_id :: " + o_id);
		console.log("driver_id :: " + driver_id);
		$scope.isDriverIDValid = false;
		if(driver_id && driver_id.length != 9) {
			$http({
				method : 'POST',
				url : '/order/assignDriverId',
				data : {
					o_id : o_id,
					driver_id : driver_id 
				}

			}).success(function(res) {
				if(res.status == 200) {
					console.log(res);
					$scope.getPending();
				} else if(res.status == 401){
					console.log("err : " + res.error);
					return;
				}
				
			}).error(function(err) {
				console.log("error ::" + err);
			});
		} else {
			$scope.isDriverIDValid = true;
			$scope.invalidDriverId = o_id;
		}
	}
	
	$scope.getInProgress = function() {
		$scope.isButtonClicked = true;
		$scope.isPendingClicked = false;
		$scope.isInProgressClicked = true;
		$scope.isCompleteClicked = false;
		$scope.isCancelClicked = false;
		console.log("getInProgress");

		$http({
			method : "POST",
			url : '/order/inprogress'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getInProgress : " + res.data);
				$scope.orders = res.data;
			}
		});
	}

	$scope.assignComplete = function(o_id) {
		
		console.log("o_id :: " + o_id);
		//if(driver_id && driver_id.length != 9) {
			$http({
				method : 'POST',
				url : '/order/assignComplete',
				data : {
					o_id : o_id,
				}
			}).success(function(res) {
				if(res.status == 200) {
					console.log(res);
					$scope.getInProgress();
				} else if(res.status == 401){
					console.log("err : " + res.error);
					return;
				}
				
			}).error(function(err) {
				console.log("error ::" + err);
			});
		/*} else {
			$scope.isDriverIDValid = true;
			$scope.invalidDriverId = o_id;
		}*/
	}




	$scope.getComplete = function() {
		$scope.isButtonClicked = true;
		$scope.isPendingClicked = false;
		$scope.isInProgressClicked = false;
		$scope.isCompleteClicked = true;
		$scope.isCancelClicked = false;
		console.log("getComplete");

		$http({
			method : "POST",
			url : '/order/complete'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getComplete : " + res.data);
				$scope.orders = res.data;
			}
		});
	}

	$scope.getCancel = function() {
		$scope.isButtonClicked = true;
		$scope.isPendingClicked = false;
		$scope.isInProgressClicked = false;
		$scope.isCompleteClicked = false;
		$scope.isCancelClicked = true;
		console.log("getCancel");

		$http({
			method : "POST",
			url : '/order/cancel'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getCancel : " + res.data);
				$scope.orders = res.data;
			}
		});
	}

	/*
		Admin orders-list page Operations end
	*/


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
		console.log("is active "+data.isActive);
		$http({
			method : "POST",
			url : '/farmer/edit',
			data: {
				f_id : id,
				fname: data.fname,
				lname: data.lname,
				email: data.email,
				address: data.address,
				city: data.city,
				state: data.state,
				zipcode: data.zipcode,
				intro: data.intro,
				video: data.video,
				tax: data.tax,
				contacts: data.contacts,
				isActive: data.isActive==1 ? true : false
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
				f_id: data.f_id,
				cat_id: data.cat_id,
				price: data.price,
				weight: data.weight,
				unit: data.unit,
				details: data.details,
				description: data.description,
				features: data.features,
				quantity: data.quantity
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
		console.log($scope.isActive);
		$http({
			method : "POST",
			url : "/farmer/create",
			data: {
				fname: $scope.fname,
				lname: $scope.lname,
				email: $scope.email,
				pass: $scope.pass,
				intro: $scope.intro,
				contacts: $scope.contact_no,
				video: $scope.video,
				tax: $scope.tax,
				address: $scope.address,
				city: $scope.city,
				state: $scope.state,
				zipcode: $scope.zipcode
			}
		}).success(function(res) {
			if(res.status == 200) {
				console.log("success on add farmer :" + res.data);
				$scope.dismiss();
			}
		});
	};

	//add farmer
	$scope.addProduct = function(){
		console.log("addProduct ::");
		var file = $scope.picFile;
		console.log($scope.picFile);
		console.log($scope.picFile1);
		console.log($scope.picFile2);
		console.log($scope.picFile3);
/*		var $scope.prod_img =null;
        var $scope.prod_img1=null;
        var $scope.prod_img2=null;
        var $scope.prod_img3=null;
*/
		Upload.upload({
			url:"/fileUpload",
			data:{
				product_img: $scope.picFile
			}
		}).success(function(res){
			$scope.prod_img = "img/"+res.data;
			Upload.upload({
				url:"/fileUpload",
				data:{
					product_img: $scope.picFile1
				}
			}).success(function(res){
				//$scope.prod_img1 = ;
				$scope.prod_img1 = "img/"+res.data;
				Upload.upload({
					url:"/fileUpload",
					data:{
						product_img: $scope.picFile2
					}
				}).success(function(res){
					$scope.prod_img2 = "img/"+res.data;
						Upload.upload({
						url:"/fileUpload",
						data:{
							product_img: $scope.picFile2
						}
					}).success(function(res){
						$scope.prod_img3 = "img/"+res.data;
						console.log($scope.prod_img+" "+$scope.prod_img1+""+$scope.prod_img2+" "+$scope.prod_img3);
						$http({
							method : "POST",
							url : "/product/create",
							data: {
								name: $scope.product_name,
								f_id: $scope.f_id,
								//f_name: $scope.f_name,
								cat_id: $scope.category,
								price: $scope.price,
								weight: $scope.weight,
								unit: $scope.unit,
								product_img: $scope.prod_img,
								image1: $scope.prod_img1,
								image2: $scope.prod_img2,
								image3: $scope.prod_img3,
								details: $scope.product_info,
								description: $scope.description,
								features: $scope.features,
								quantity: $scope.quantity
								/*product_img1: $scope.prod_img2,
								product_img1: $scope.prod_img3*/	
							}
						}).success(function(res) {
							if(res.status == 200) {
								console.log("success on add product :" + res.data);
								$scope.dismiss();
							}
						});
					});
				});
			});
		});
	}	

	$scope.statuses = [
	    {value: 1, text: 'Aprroved'},
	    {value: 2, text: 'Rejected'},
  	]; 

  	$scope.getCategory = function(){
  		$http({
  			method: "GET",
  			url: "/category/get"
  		}).success(function(res){
  			$scope.categs = res.data;
  			$scope.categories = [];
  			console.log(res.data);
  			for(var i in res.data){
				$scope.categories[i] = { value : Number(res.data[i].cat_id), text: res.data[i].name }
			}
  			console.log($scope.categories);
  		});
  	};

  	$scope.showStatus = function(farmer) {
	    var selected = [];
	    var temp = farmer.isActive==true ? 1 : 2;
	   	//console.log("temp ::"+temp);
    	selected = $filter('filter')($scope.statuses, {value: temp });
	    
	    //console.log(selected);
	    return selected.length ? selected[0].text : 'Not set';
  	};


  	$scope.showCategory = function(product){
  		var selected = [];
	    var temp = product.cat_id;
	   	//console.log("temp ::"+temp);
    	selected = $filter('filter')($scope.categories, {value: temp });
	    console.log(selected);
	    return selected.length>0 ? selected[0].text : 'Not set';
  	}
	//editableOptions.theme = 'bs3';
}]);
