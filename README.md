angularLocalStorage [![Build Status](https://travis-ci.org/agrublev/angularLocalStorage.png?branch=master)](https://travis-ci.org/agrublev/angularLocalStorage)
====================

The simpliest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Attention :

* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your javascript values from strings.
* No Fallback to Angular ``$cookies`` if localStorage is not supported
* I hadn't follow the TDD rule to code this module , the test file hadn't modified

## How to use

1. Just add this module to your app as a dependency
``var yourApp = angular.module('yourApp', [..., 'angularLocalStorage']``
2. Now inside your controllers simply pass the storage factory like this
``yourApp.controller('yourController', function( $scope, storage){``
3. Using the ``storage`` factory
  ```JAVASCRIPT

  // just storing something in localStorage with cookie backup for unsupported browsers
  storage.set('key','value');
  
  // another way storing something in localstorage if you want to avoid QUOTA_EXCEEDED_ERR in iphone/ipad 
  storage.update('key','value');
  
  // getting that value
  storage.get('key');

  // remove that key
  storage.remove('key');

  // clear all localStorage values
  storage.clearAll();
  
  //make a data-binding from model to localstorage or reverse or both depend on the param direction
  storage.bind($scope,'modelKey','storageKey','dirction');
  ```
4. About data-binding 
  Compare with original version , I had modified all the code about data-binding , for I think it difficult and     confused. 
  ```JAVASCRIPT
	storage.bind($scope,'zero','zero','normal');
	storage.unbind($scope,'zero','zero','normal');
  ```
  Below is example snippt for data-binding if you don't use bind method:
  ```JAVASCRIPT
      $scope.storageListener = function(){
          return storage.get('zero');
      }
      var tmp=$scope.$watch($scope.storageListener,function(newVal,oldVal){
      	  $scope.zero = newVal;
      },true) 
      tmp(); 
  ```
  The snippt purpose is to modify $scope.zero when localstorage.zero has changed,direction is from localstorage to
  model

  ```JAVASCRIPT
	  $scope.zero = 'I Love You!';
      var tmp=$scope.$watch('zero',function(newVal,oldVal){
      	storage.update('zero',$scope.zero);
      },true) 
      tmp(); 
  ```
  The snippt purpose is to modify  localstorage.zero when $scope.zero has changed,direction is from model to 
  localstorage
  
  Please add an issue with ideas, improvements, or bugs! Thanks!
  You can send me email ``hjj491229492@hotmail.com``

---

(c) 2013 MIT License

