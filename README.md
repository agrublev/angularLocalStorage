Angular-localStorage [![Build Status](https://travis-ci.org/agrublev/Angular-localStorage.png?branch=master)](https://travis-ci.org/agrublev/Angular-localStorage)
====================

The simpliest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Features:

* Two way bind your $scope variable value to a localStorage key/pair which will be updated whenever the model is updated.
* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your javascript values from strings.
* Fallback to Angular ``$cookies`` if localStorage is not supported (REMEMBER to add ``angular-cookies.min.js`` script to your project or remove ``'ngCookies'`` from a dependency);

## How to use

1. Just add this module to your app as a dependency
``var yourApp = angular.module('yourApp', [..., 'localStorage']``
2. Now inside your controllers simply pass the $store factory like this
``yourApp.controller('yourController', function( $scope, $store){``
3. Using the ``$store`` factory
  ```
  // binding it to a $scope.variable
  $store.bind($scope,'varName','someDefaultValue');
  // the params are ($scope, varName, defaultValue(optional))
  // $scope - pass a reference to whatever scope the variable resides in
  // varName - the variable name so for $scope.firstName enter 'firstName'
  // defaultValue - if you want to set a default value if there is no localStorage value so that the first time you initiate it the value is assigned

  // will constantly be updating $scope.viewType
  // to change the variable both locally in your controller and in localStorage just do
  $scope.viewType = 'ANYTHING';
  // that's it, it will be updated in localStorage

  // just storing something in localStorage with cookie backup for unsupported browsers
  $store.set('key','value');
  // getting that value
  $store.get('key');
  ```

## Bower
This module is available as bower package, install it with this command:

```bash
bower install Angular-localStorage
```

or

```bash
bower install git://github.com/agrublev/Angular-localStorage.git
```

## Example

For live example please checkout - http://plnkr.co/edit/Y1mrNVRkInCItqvZXtto?p=preview

## Suggestions?

Please add an issue with ideas, improvements, or bugs! Thanks!

---

(c) 2013 MIT License

