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
            $scope.lrg_image = window.image1;
        	$scope.magic_zoom = window.image1;

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

            $scope.create_review = function($params) {
                // console.log($params.star);
                console.log($scope.starr);
    //     $http.post('/create_review',{'star': 1,'title':$params.title, 'review':$params.review, p_id: window.p_id})
    //     .success(function(data, status) {
    //         $scope.frm.star = "";
    //         $scope.frm.title = "";
    //         $scope.frm.review = "";
    //         console.log("Success");
    // })
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
            function cart()  {  
            	$http.post('/cart')
                .success(function(data) {
                	console.log("Should open cart");
            		});
                }            
        }]);