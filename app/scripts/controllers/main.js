'use strict';

angular.module('angularLocalStoragesApp')
  .controller('MainCtrl', function($scope,storage,$log) {
  	$scope.storeKey = null;
  	$scope.storeValue = null;
  	$scope.getKey = null;
  	$scope.getValue = null;
  	$scope.love = null;
  	$scope.removeKey = null;

    $scope.bindLove = function(){
    	storage.bind($scope,"love","love","reverse");
    }

  	$scope.unBindLove = function(){
  		storage.unbind($scope,"love","love","reverse");
  		$scope.love = null;
  	}

    $scope.bindKiss = function(){
    	storage.bind($scope,"kiss","kiss","forward");
    }

  	$scope.unBindKiss = function(){
  		storage.unbind($scope,"kiss","kiss","forward");
  	}

  	$scope.getValues = function(){
        $scope.getValue = storage.get($scope.getKey);

  	}

  	$scope.setValues = function(){
        storage.set($scope.storeKey,$scope.storeValue);
  	}

  	$scope.removeValues = function(){
        storage.remove($scope.removeKey);
  	}  

  	$scope.removeAllValues = function() {
  		storage.clearAll();
  	}  

  });
