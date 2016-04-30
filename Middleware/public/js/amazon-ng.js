var app = angular.module("amazon",[]);

app.controller("amazon",function($scope, $http, $location){
	
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

	if(window.location.pathname.indexOf("/PreviewOrder") >= 0){
		angular.element('.cart-head').hide();
		angular.element('.cart-proceed').hide();
	}

	// console.log(window.c_id);
	if(window.c_id){
		$scope.getCartItems();
	}

	var days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];
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
});