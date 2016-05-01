var user = angular.module('farmerModule',['xeditable']);

user.controller('farmerController',['$scope','$http','$sce','$filter', function($scope,$http,$sce,$filter){
	$scope.getfarmer = function(){
    $http({
      method : "GET",
      url : '/farmer/get'
    }).success(function(res){
      if (res.status === 200) {
        console.log("success on getfarmer" + res.data);
        $scope.farmer = res.data;
      }
    });
  }

  $scope.saveFarmer = function(data,id){
    angular.extend(data, {id: id});
    //id = 100000001;
    console.log(data);
    //return $http.post('/farmer/edit', $scope.farmer)
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
        contacts: data.contacts
        //isActive: data.isActive==1 ? true : false
      }
    }).success(function(res){
      if (res.status === 200) {
        console.log("success on save farmer" + res.data);
        $scope.farmerformValidate = false;
        return;
        //$scope.farmers = res.data;
        //return $http.post('/saveUser', data);
      }
    }).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"} 
        $scope.editableForm.$setError(err.field, err.msg);
      } else { 
        // unknown error
        $scope.editableForm.$setError('name', 'Unknown error!');
      }
    });
  }

  $scope.getproducts = function(){
    $http({
      method : "GET",
      url : '/farmer/product/all',
    }).success(function(res){
      if (res.status === 200) {
        console.log("success on get farmer products" + res.data);
        $scope.products = res.data;
      }
    });
  }

    //add farmer
  $scope.addProduct = function(){
    console.log("addProduct ::");

    $http({
      method : "POST",
      url : "/product/create",
      data: {
        name: $scope.product_name,
        //f_id: $scope.f_id,
        //f_name: $scope.f_name,
        cat_id: $scope.category,
        price: $scope.price,
        weight: $scope.weight,
        unit: $scope.unit,
        details: $scope.product_info,
        description: $scope.description,
        features: $scope.features,
        quantity: $scope.quantity
      }
    }).success(function(res) {
      if(res.status == 200) {
        console.log("success on add product :" + res.data);
        $scope.dismiss();
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

  $scope.showCategory = function(product){
    var selected = [];
    var temp = product.cat_id;
    console.log("temp ::"+temp);
    selected = $filter('filter')($scope.categories, {value: temp });
    console.log(selected);
    return selected.length ? selected[0].text : 'Not set';
  }





}]);