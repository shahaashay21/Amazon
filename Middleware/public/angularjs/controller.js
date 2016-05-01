 var main = angular.module('Product', []);
        main.controller('formCtrl', ['$scope', '$http', function ($scope, $http) {
        	$scope.quantity = false;
        	$scope.addtocart = true;
        	$scope.cart = true;
        	$scope.review = false;
            $scope.description = true;
            $scope.details = true;
            $scope.features = true;
            $scope.lrg_image = window.image1;
        	$scope.magic_zoom = window.image1;

        	function checksession()  {
                console.log("in checksession");
        		if(window.session == true)
        		{

                	console.log("checksession successful");
                	$scope.quantity = true;
                	$scope.addtocart = false;
                	$scope.cart = true;
                	$scope.signin = false;
                	$scope.review = true;
                	$scope.disabled_button = false;
            	}
                console.log(window.image1);
                console.log(window.session);
        	}
        	
        	checksession();
        	
        	
            $scope.change_image1 = function () {  
            	console.log("Went on image 1"); 
            	$scope.lrg_image=window.image1;
                $scope.magic_zoom = window.image1;
                console.log($scope.magic_zoom);
            };  
            $scope.change_image2 = function () {  
            	console.log("Went on image 2"); 
            	$scope.lrg_image=window.image2;
                $scope.magic_zoom = window.image2;
                console.log($scope.magic_zoom);
            }; 
            $scope.change_image3 = function () {  
                console.log("Went on image 3"); 
                $scope.lrg_image=window.image3;
                $scope.magic_zoom = window.image3;
                console.log($scope.magic_zoom);
            };
            $scope.change_image4 = function () {  
                console.log("Went on image 4"); 
                $scope.lrg_image=window.image4;
                $scope.magic_zoom = window.image4;
            };
            $scope.change_image5 = function () {  
                console.log("Went on image 5"); 
                $scope.lrg_image=window.image5;
                $scope.magic_zoom = window.image5;
            };
            $scope.change_image6 = function () {  
                console.log("Went on image 6"); 
                $scope.lrg_image=window.image6;
                $scope.magic_zoom = window.image6;
            };  
            
            function review()  {
                $http.post('/review')
                .success(function(data) {
                console.log("Review done");	
                });
                }
            
            function signin()  {  
            	$http.get('/login')
                .success(function(data) {
                	console.log("Should get signin page");
            		});
                }

            // CREATED BY AASHAY SHAH
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

            // CREATED BY AASHAY SHAH
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

            // console.log(window.c_id);
            if(window.c_id){
                $scope.getCartItems();
            }    

        }]);