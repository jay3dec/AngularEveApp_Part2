'use strict';

angular.module('addItem', ['ngRoute','myAppService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addItem', {
    templateUrl: '../addItem/addItem.html',
    controller: 'AddItemCtrl'
  });
}])

.controller('AddItemCtrl', ['$scope','CommonProp','$http','$location',function($scope,CommonProp,$http,$location) {
	$scope.addItem = function(title){
		
        var auth = CommonProp.getUserAuth();
	
        var user = CommonProp.getUser();

	$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
    	$http.defaults.headers.common = {"Access-Control-Expose-Headers": "Origin, X-Requested-With, Content-Type, Accept"};
	$http.defaults.headers.common["Cache-Control"] = "no-cache";
    	$http.defaults.headers.common.Pragma = "no-cache";
    	$http.defaults.headers.common['Authorization'] = 'Basic '+auth;
    
	$http({method: 'POST',cache: false, url: 'http://127.0.0.1:5000/item',data: { name: title,username: user }}).
            success(function(data, status, headers, config) {
		$location.path('/userHome');
            }).
            error(function(data, status, headers, config) {
                console.log(data,status);
            });	
	
	};
}]);
