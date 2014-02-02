angularLocalStorage [![Build Status](https://travis-ci.org/agrublev/angularLocalStorage.png?branch=master)](https://travis-ci.org/agrublev/angularLocalStorage)
====================

The simpliest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Attention :

* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your javascript values from strings.
* No Fallback to Angular ``$cookies`` if localStorage is not supported

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
  ```
4. About data-binding 
  Compare with original version , I delete all the code about data-binding , for I think it difficult and confused
  to achieve, so I give the operation to yourself. Below is example snippt:
  ```JAVASCRIPT
      $scope.storageListener = function(){
          return storage.get('zero');
      }
      $scope.$watch($scope.storageListener,function(newVal,oldVal){
      	  $scope.zero = newVal;
      },true)  
  ```
  The snippt purpose is to modify $scope.zero when localstorage.zero has changed,direction is from localstorage to
  model

  ```JAVASCRIPT
  	  $scope.zero = 'I Love You!';
      $scope.$watch("zero",function(newVal,oldVal){
      	storage.update('zero',$scope.zero);
      },true)  
  ```
  The snippt purpose is to modify  localstorage.zero when $scope.zero has changed,direction is from model to 
  localstorage

Please add an issue with ideas, improvements, or bugs! Thanks!

---

(c) 2013 MIT License

