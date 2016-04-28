var app = angular.module("amazon",[]);

app.controller("amazon",function($scope, $http, $location){
	
	$scope.getCartItems = function(){
		$http({
			method: 'POST',
			url: 'cart',
			dataType: 'json'
		}).then(function(res){
			console.log(res.data);
			$scope.cartTotal = res.data.grandTotal;
			$scope.cartQty = res.data.qty;
			$scope.cartItemDetails = res.data.cartItemDetails;
			$scope.cartItems = res.data.items;
			$scope.totalEachItem = res.data.totalEachitem;
		});
	}

	$scope.addItem = function(p_id, update){
		if(update){
			var quantity = update;
		}else{
			var quantity = angular.element('#product'+p_id).val();
		}
		console.log(quantity);
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


	$scope.getCartItems();
});