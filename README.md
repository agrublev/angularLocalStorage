Angular-localStorage
====================

The simpliest localStorage module you will ever use. Allowing you to set,get, and *bind* variables.

## Features:

* Two way bind your $scope variable value to a localStorage which will be updated whenever the model is updated, and vice versa.
* You can directly store Objects, Arrays, Floats, Booleans, and Strings. No need to convert your objects to strings and then reverse them.
* Fallback to Angular ``$cookies`` if localStorage is not supported (*REMEMBER* to add ``angular-cookies.min.js`` script to your project or remove ``'ngCookies'`` from a dependency);

## How to use

This module is also available as bower package, install it with such command:

```bash
bower install angular-localStorage
```

1. Your application most likely has a line where you set it as a variable containing your module
``var yourApp = angular.module('yourApp', [...]``
2. Just add this module to your app as a dependency
``var yourApp = angular.module('yourApp', [..., 'localStorage']``
3. Now inside your controllers simply pass the $store like this
``yourApp.controller('yourController', function( $scope, $store){``
4. Using the ``$store`` factory
  ```
  // binding it to a $scope.variable - the params ($scope, varName, defaultValue(optional))
  $store.bind($scope,'viewType','cardView');
  // will constantly be updating $scope.viewType
  // to change the variable both locally in your controller and in localStorage just do
  $scope.viewType = 'ANYTHING';
  // that's it, it will be updated in localStorage

  // just storing something in localStorage with cookie backup for unsupported browsers
  $store.set('key','value');
  // getting that value
  $store.get('key');
  ```

## Example

For live example please checkout - http://plnkr.co/edit/Y1mrNVRkInCItqvZXtto?p=preview

## To do

Please add issues for ideas or improvements! Thanks!

## Contributors

```bash
 project  : Angular-localStorage
 repo age : 7 weeks
 active   : 7 days
 commits  : 21
 files    : 3
 authors  :
    14  agrublev                66.7%
     5	Dmitri Voronianski      23.8%
     2	Alex Knol               9.5%
```

---

(c) 2013 MIT License

