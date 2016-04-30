var app = angular.module("amazon",[]);

app.controller("amazon",function($scope, $http, $location){
	
	//CONFIG
	$scope.monthname = function(){
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		temp = new Date();
		return monthNames[temp.getMonth()];
	}
	var days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];

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