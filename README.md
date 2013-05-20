Angular-localStorage
====================

The simplest localStorage implementation you will ever use.

To use this factory you can simply include it anywhere in your app. Just make sure you set the variable to your own module as
a way to use it much cleaner than a whole separate module.

Would look something like $store.set('something',{objects:"absolutely"}); then get it with $store.get('something') which will
return an object! Yup works with objects, floats, booleans, etc.

=Binding=

You can also bind the localStorage pair to a $scope variable like this:

$store.bind($scope,'myVar','defaultValue can by any type');

Then can simply access or change the localStorage value with

console.log($scope.myVar); // will return 'defaultValue can by any type'
$scope.myVar = "AWESOME"; // will set the localStorage value and the variable to 'AWESOME'

