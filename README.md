Angular-localStorage
====================

The simplest localStorage implementation you will ever use. Allowing you to set,get, and *bind* variables. For live 
example please checkout http://jsfiddle.net/agrublev/QjVq3/

Instead of being a stand alone module that you have to deal with including in your application it's provided as a factory
that you can quickly and easily add to your own application module.

Another difference between this solution and others is that you can directly store Objects, Arrays, Floats,
Booleans, and Strings. No need to convert your objects to strings and then reverse that. You can also
bind your localStorage value to a $scope variable which will be updated whenever the lS is updated, and vice versa.

If you are unsure on how to use it read this:

1. Your application most likely has a line where you set it as a variable containing your module
`var yourApp = angular.module('yourApp',... `
2. Using this same variable attach the factory i've provided as a stand alone file like this
`yourApp.factory("$store",function(){`
3. Now inside your controllers simply pass the $store like this
`yourApp.controller('yourController',function( $scope, $store){`
4. Using the $store factory
  ```
  // binding it to a $scope.variable - the params ($scope, varName, defaultValue(optional))
  $store.bind($scope,'viewType','cardView');
  // will constantly be updating $scope.viewType
  // to change the variable both locally in your controller and in localStorage just do
  $scope.viewType = "ANYTHING";
  // that's it, it will be updated in localStorage

  // just storing something in localStorage with cookie backup for unsupported browsers
  $store.set("key","value");
  // getting that value
  $store.get("key");
  ```

please do add issues for ideas or improvements!

