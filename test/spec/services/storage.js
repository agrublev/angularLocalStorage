'use strict';

describe('Service: storage', function () {

  var scope,storage,tmp,windows;
  // load the service's module
  beforeEach(module('angularLocalStoragesApp'),['angularLocalStorage']);
  
  beforeEach(inject(function ($rootScope,$window) {
        scope = $rootScope.$new();
        windows = $window;
  }))

  // instantiate service

  beforeEach(inject(function($injector) {
     storage = $injector.get('storage');
  }));

  it('the getLength method must work right!',function () {
    var tmp = storage.getLength();
    var tmps = windows.localStorage.length;
    expect(tmp).toEqual(tmps);
  })

  it('the clearAll method must work right!',function () {
    storage.clearAll();
    var tmp = storage.getLength();
    expect(tmp).toEqual(0);
  })  

  it('the set/get pairs should work right', function () {
     storage.clearAll();
     storage.set('title','I love you!');
     var tmp = storage.get('title');
     var lengths = storage.getLength();
     expect(tmp).toBe('I love you!');
     expect(lengths).toEqual(1);
  });

  it('the remove method should work right', function () {
     storage.clearAll();
     storage.set('title','I love you!');
     storage.remove('title');
     var lengths = storage.getLength();
     expect(lengths).toEqual(0);
  });

});
