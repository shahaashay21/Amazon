var app = angular.module("amazon",[]);

app.controller("amazon",function($scope, $http, $location){
	
	//CONFIG
	$scope.monthname = function(){
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		temp = new Date();
		return monthNames[temp.getMonth()];
	}
	var days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];

	var tempcheck = "";
	$scope.q ="";
	$scope.search = function(opt){
		var hashtag = 0;
		var handle = 0;
		if(opt == "focus"){
			tempcheck = "";
		}
		if($scope.q != tempcheck){
			var data = {'q': $scope.q};

			$http({
				method: 'POST',
				dataType: 'json',
				url: '/suggest',
				data: data
			}).then(function success(res){
				console.log(res);
				$scope.availableTags = res.data;
				angular.element('.for-drop-hashtag').css("display","none");
				angular.element('.for-drop').css("display","table");
			
				angular.element('.dropdown-toggle').dropdown();
				angular.element('.dropdown-toggle').css("display","table");
				tempcheck = $scope.q;
			});
			
		}
	};

	//REDIRECT TO USER PROFILE PAGE
	$scope.userRedirect= function(id){
		window.location.assign("/search?q="+id);
	};

	$scope.getCartItems = function(){
		$http({
			method: 'POST',
			url: 'cart',
			dataType: 'json'
		}).then(function(res){
			// console.log(res.data);
			$scope.cartTotal = res.data.grandTotal;
			$scope.cartQty = res.data.qty;
			$scope.cartItemDetails = res.data.cartItemDetails;
			$scope.cartItems = res.data.items;
			$scope.totalEachItem = res.data.totalEachitem;
			$scope.tax = res.data.tax;
			$scope.delivery_charge = res.data.delivery_charge;
			$scope.finalTotal = res.data.finalTotal;
		});
	}

	$scope.addItem = function(p_id, update){
		if(window.c_id){
			if(update){
				var quantity = update;
			}else{
				var quantity = angular.element('#product'+p_id).val();
			}
			// console.log(quantity);
			data = {'id': p_id, 'quantity': quantity};
			url = '/additem';
			$http({
				method: 'POST',
				url: url,
				data: data,
				dataType: 'json'
			}).then(function(data){
				$scope.getCartItems();
			});
		}
	}

	$scope.finalOrder = function(){
		if(window.isCard == 'no'){
			alertline('alert-notify-danger','<b>Please provide card details.</b>');
			return;
		}
		if(window.isAddress == 'no'){
			alertline('alert-notify-danger','<b>Please provide delivery address.</b>');	
			return;
		}
		dayDate = angular.element('#dayDate').val();
		time = angular.element('#time').val();
		temp = new Date();
		month = $scope.monthname();
		drop_time = new Date(month+' '+(temp.getDate() + Number(dayDate))+', '+temp.getFullYear()+' '+time);
		console.log(drop_time);
		data = {'drop_time': drop_time};
		url = '/order';
		$http({
			method: 'POST',
			url: url,
			data: data,
			dataType: 'json'
		}).then(function(data){
			console.log(data);
			if(data.data.suc == 'false'){
				alertline('alert-notify-danger','<b>Sorry</b>, We have only <b>'+data.data.availableQuant+'</b> quantity available of <b>'+data.data.itemName+'</b>');
			}
		});

	}

	if(window.location.pathname.indexOf("/PreviewOrder") >= 0){
		angular.element('.cart-head').hide();
		angular.element('.cart-proceed').hide();
	}

	// console.log(window.c_id);
	if(window.c_id){
		$scope.getCartItems();
	}

	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	nowdate = new Date();
	$scope.del_day = [];
	$scope.del_date = [];
	$scope.del_day_date = [];
	for(var i=0; i<4; i++){
		tempdate = new Date(nowdate.setDate(nowdate.getDate() + 1));
		$scope.del_day[i] = days[tempdate.getDay()];
		$scope.del_date[i] = tempdate.getDate();

		$scope.del_day_date[i] = $scope.del_day[i]+', '+$scope.del_date[i];
	}
	$scope.del_time = ['8','9','10','11','12','18','19','20'];
	// console.log($scope.del_day_date[0]);

	// alertline('alert-notify-danger','<b>Successfully Registered.</b> Now you can LOGIN');
	

	// temp = new Date();
	// mo = $scope.monthname();
	// timepass = mo+' '+(temp.getDate() + 1)+', '+temp.getFullYear()+' '+temp.getHours()+':00';
	// console.log(timepass);
	// d = new Date(mo+' '+(temp.getDate() + 1)+', '+temp.getFullYear()+' '+temp.getHours()+':00');
	// console.log(d);
});