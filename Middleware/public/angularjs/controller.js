 var main = angular.module('Product', []);
        main.controller('formCtrl', ['$scope', '$http', function ($scope, $http) {
        	$scope.quantity = false;
        	$scope.addtocart = true;
        	$scope.cart = false;
        	$scope.signin = true;
        	$scope.review = false;
            $scope.description = true;
            $scope.details = true;
            $scope.features = true;
            
        	
        	function checksession()  {
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
        	}
        	
        	checksession();
        	
        	
            $scope.change_image1 = function () {  
            	console.log("Went on image 1"); 
            	$scope.lrg_image=window.image1;
            };  
            $scope.change_image2 = function () {  
            	console.log("Went on image 2"); 
            	$scope.lrg_image=window.image2;
            }; 
            $scope.change_image3 = function () {  
                console.log("Went on image 3"); 
                $scope.lrg_image=window.image3;
            };
            $scope.change_image4 = function () {  
                console.log("Went on image 4"); 
                $scope.lrg_image=window.image4;
            };
            $scope.change_image5 = function () {  
                console.log("Went on image 5"); 
                $scope.lrg_image=window.image5;
            };
            $scope.change_image6 = function () {  
                console.log("Went on image 6"); 
                $scope.lrg_image=window.image6;
            };

            function create_review()  {
            //$http.post('/create_review')
            //.success(function(data) {
            	//still left to do create_review functionality
        	//	});
            }
            
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
            function cart()  {  
            	$http.post('/cart')
                .success(function(data) {
                	console.log("Should open cart");
            		});
                }            
        }]);