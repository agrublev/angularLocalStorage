angularLocalStorage [![Build Status](https://travis-ci.org/agrublev/angularLocalStorage.svg?branch=master)](https://travis-ci.org/agrublev/angularLocalStorage)
====================

The simpliest localStorage module you will ever use. Allowing you to set, get, and *bind* variables.

## Features:

* Two way bind your $scope variable value to a localStorage key/pair which will be updated whenever the model is updated.
* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your javascript values from strings.
* Fallback to Angular ``$cookieStore`` if localStorage is not supported (REMEMBER to add ``angular-cookies.min.js`` script to your project or remove ``'ngCookies'`` from a dependency);

## How to use

1. Just add this module to your app as a dependency
``var yourApp = angular.module('yourApp', [..., 'angularLocalStorage']``
2. Now inside your controllers simply pass the storage factory like this
``yourApp.controller('yourController', function( $scope, storage){``
3. Using the ``storage`` factory
  ```JAVASCRIPT
  // Note: if the scope variable already exists, it takes precedence over the default and stored values
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

  // Getting an unset key will return null
  console.log(storage.get('keyThatIsUndefined')) // null
  
  // checking if the cookie fallback is being used right now, so you don't try to store fairly big data in cookies
  if(!storage.isCookieFallbackActive()) {
    ...
  }

  // clear all localStorage values
  storage.clearAll();

  // gets all the keys in the storage system returned as an array
  storage.getKeys(); // ['key','key2']
  ```

## Bower
This module is available as bower package, install it with this command:

```bash
bower install angularLocalStorage
```

or

```bash
bower install git://github.com/agrublev/angularLocalStorage.git
```

## Angular Requirements
0.3.0 requires AngularJS 1.3.0+.

0.2.0 requires AngularJS 1.2.x.

## Example

For live example please checkout - http://plnkr.co/edit/PNLjDEaRKtpLgGZMJypk?p=preview

## Suggestions?

Please add an issue with ideas, improvements, or bugs! Thanks!

---

(c) 2015 MIT License

