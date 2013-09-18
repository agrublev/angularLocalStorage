angularLocalStorage [![Build Status](https://travis-ci.org/capaj/angularLocalStorage.png?branch=master)](https://travis-ci.org/capaj/angularLocalStorage)
====================

The simplest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Features:

* Two way bind your $scope variable value to a localStorage key/pair which will be updated whenever the model is updated.
* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your javascript values from strings.
* THIS FORK DOESNT support fallback to cookies, if you want that, go grab https://github.com/agrublev/angularLocalStorage
* automatic dateStamp creation for stored values(can be turned off assigning: storage.dateStamps = false;)

## How to use

1. Just add this module to your app as a dependency
``var yourApp = angular.module('yourApp', [..., 'angularLocalStorage']``
2. Now inside your controllers simply pass the storage factory like this
``yourApp.controller('yourController', function( $scope, storage){``
3. Using the ``storage`` factory
  ```
  // binding it to a $scope.variable (minimal)
  storage.bind($scope,'varName');
  // binding full
  storage.bind($scope,'varName',{defaultValue: 'randomValue123' ,storeName: 'customStoreKey'});
  // the params are ($scope, varName, opts(optional))
  // $scope - pass a reference to whatever scope the variable resides in
  // varName - the variable name so for $scope.firstName enter 'firstName'
  // opts - custom options like default value or unique store name
  // 	Here are the available options you can set:
  // 		* defaultValue: the default value
  // 		* storeName: add a custom store key value instead of using the scope variable name

  // will constantly be updating $scope.viewType
  // to change the variable both locally in your controller and in localStorage just do
  $scope.viewType = 'ANYTHING';
  // that's it, it will be updated in localStorage

  // just storing something in localStorage with cookie backup for unsupported browsers
  storage.set('key','value');
  // getting that value
  storage.get('key');
  // getting stamp for that value
  storage.getDateStamp('key');

  // clear all localStorage values
  storage.clearAll();
  ```

## Bower
This module is installed with this command:

```bash
bower install angularLocalStorage-nc
```
or
```bash
bower install git://github.com/capaj/angularLocalStorage.git
```


---

(c) 2013 MIT License

