angularLocalStorage [![Build Status](https://travis-ci.org/agrublev/angularLocalStorage.png?branch=master)](https://travis-ci.org/agrublev/angularLocalStorage)
====================

The simpliest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Features:

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
  
  // getting that value
  storage.get('key');

  // clear all localStorage values
  storage.clearAll();
  ```

Please add an issue with ideas, improvements, or bugs! Thanks!

---

(c) 2013 MIT License

